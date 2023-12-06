import { createElement, debounceAfterFirst, observeScopedEvent, pluckEventTarget } from "./utils";
import { readConfig } from "./config";
import { goToPage$ } from "./history";
import { BehaviorSubject, Observable, filter, fromEvent, map, tap } from "rxjs";
import Router from "./router";
import Route from "./route";
import css from "./css";
import Lightbox from "./lightbox";

const themes = {
    default: css.style,
}

export default abstract class App extends HTMLElement {
    abstract getRoutes(): Route<any>[];
    title$ = new BehaviorSubject("");

    connectedCallback() {
        this.title$.subscribe(title => document.title = title);

        const router = new Router(this.getRoutes());

        router.init();

        const baseURI = document.location.origin;

        function fromEventTarget<T>(element: EventTarget, eventName: string): Observable<[Event, T]> {
            return fromEvent<Event>(element, eventName).pipe(
                map(e => [e, e.target as T])
            );
        }

        const clickedLink$ =
            fromEventTarget<HTMLAnchorElement>(document, "click").pipe(
                filter(([e, target]) => target.tagName == "A" && target.href.startsWith(baseURI) && !target.getAttribute("href").startsWith("#")),
                tap(([e, target]) => e.preventDefault()),
                map(([e, target]) => target.href),
                tap(href => goToPage$.next([href.substring(baseURI.length), {}]))
            );

        clickedLink$.subscribe();

        readConfig("fontSize", 16).pipe(debounceAfterFirst(500)).subscribe(fontSize => document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`));

        observeScopedEvent(this, "click", "[data-lightbox]").pipe(
            map(([e, a]) => (a as HTMLLinkElement).href),
        ).subscribe(link => {
            const lightbox = createElement<Lightbox>("x-lightbox");
            lightbox.setImage(link);
            this.appendChild(lightbox);
        });
    }
}