import { BehaviorSubject, ReplaySubject, Subject, animationFrames, endWith, filter, last, map, merge, mergeMap, of, pairwise, scan, startWith, switchMap, takeUntil, takeWhile, tap, withLatestFrom } from "rxjs"
import { animation, createElement, findNext, findPrevious, observeImageLoaded, observeKey, observeScopedEvent, removeChildren } from "./utils";

type LightboxImage = {
    url: string,
    element: HTMLElement
};

export default class Lightbox extends HTMLElement {
    disconnected$ = new ReplaySubject<void>(1);
    image$ = new BehaviorSubject("");

    connectedCallback() {
        const duration = 0.2;

        this.innerHTML = `
        <a class="previous"></a>
        <a class="next"></a>`;

        const lightboxElements$ = of(document.querySelectorAll("data-lightbox"));

        const closePressed$ = merge(observeScopedEvent(this, "click", ".img-container", { capture: true }), observeKey("Escape"));
        const nextPressed$ = merge(observeScopedEvent(this, "click", ".next"), observeKey("ArrowRight"));
        const previousPressed$ = merge(observeScopedEvent(this, "click", ".previous"), observeKey("ArrowLeft"));

        type LightboxAction = {
            url: string,
            direction: "next" | "previous" | "new",
        };

        const lightboxActions$ = merge(
            nextPressed$.pipe(
                map(() => (images: NodeListOf<HTMLLinkElement>, current: string): LightboxAction => ({
                    url: findNext(images, element => element.href == current).href,
                    direction: "next"
                }))
            ),
            previousPressed$.pipe(
                map(() => (images: NodeListOf<HTMLLinkElement>, current: string): LightboxAction => ({
                    url: findPrevious(images, element => element.href == current).href,
                    direction: "previous"
                }))
            ),
            this.image$.pipe(
                map(url => (images: NodeListOf<HTMLLinkElement>, current: string): LightboxAction => ({
                    url: url,
                    direction: "new"
                }))
            )
        );

        lightboxActions$.pipe(
            scan((acc, cur) => {
                const action = cur(document.querySelectorAll("[data-lightbox]"), acc?.lightbox.url ?? "");
                const article = createElement("article");
                article.innerHTML = `
                    <div class="img-container">
                        <img title="Click to close" src="${action.url}"/>
                    </div>
                `;
                const r: LightboxImage = {
                    url: action.url,
                    element: article
                };
                return { lightbox: r, direction: action.direction } as const;
            }, null),
            startWith(null),
            pairwise(),
            mergeMap(([previous, next]) => {
                this.appendChild(next.lightbox.element);
                const x = next.direction == "next" ? 1 : (next.direction == "previous" ? -1 : 0);
                const y = next.direction == "new" ? 1 : 0;

                next.lightbox.element.style.setProperty(`--x`, `${x}`);
                next.lightbox.element.style.setProperty(`--y`, `${y}`);
                const n = animation(0.35, { start: 1, end: 0 }).pipe(
                    tap(v => next.lightbox.element.style.setProperty(`--animation`, `${v}`)),
                    last()
                )

                if (previous == null)
                    return n;
                previous.lightbox.element.style.setProperty(`--x`, `${x * -1}`);
                previous.lightbox.element.style.setProperty(`--y`, `${y * -1}`);
                const p = animation(0.35).pipe(
                    tap(v => previous.lightbox.element.style.setProperty(`--animation`, `${v}`)),
                    last(),
                    tap(() => this.removeChild(previous.lightbox.element))
                )

                return merge(p, n);
            })
        ).pipe(
            takeUntil(this.disconnected$),
        ).subscribe();

        closePressed$.pipe(
            tap(e => this.classList.remove("visible")),
            tap(() => this.parentElement.removeChild(this))
        ).pipe(
            takeUntil(this.disconnected$),
        ).subscribe();

        /*merge(
            closePressed$.pipe(
                tap(e => this.classList.remove("visible")),
                switchMap(v =>
                    animationFrames().pipe(
                        map(v => v.elapsed / (1000 * duration)),
                        takeWhile(v => v < 1),
                        endWith(1),
                        map(v => 1 - v),
                        //tap(v => this.style.setProperty(`--animation`, `${v}`)),
                        last()
                    )
                ),
                tap(() => this.parentElement.removeChild(this))
            ),
            previousPressed$.pipe(
                withLatestFrom(this.image$),
                tap(([_, currentSrc]) => {
                    const elements: NodeListOf<HTMLLinkElement> = document.querySelectorAll("[data-lightbox]");
                    let previous: string = null;
                    for (let element of elements) {
                        if (element.href == currentSrc)
                            break;
                        previous = element.href;
                    }
                    this.setImage(previous);
                })
            ),
            nextPressed$.pipe(
                withLatestFrom(this.image$),
                tap(([_, currentSrc]) => {
                    const elements: NodeListOf<HTMLLinkElement> = document.querySelectorAll("[data-lightbox]");
                    let next: string = null;
                    let found = false;
                    for (let element of elements) {
                        if (found) {
                            next = element.href;
                            break;
                        }
                        if (element.href == currentSrc) {
                            found = true;
                        }
                    }
                    this.setImage(next);
                })
            ),
            this.image$.pipe(
                tap(img => {
                    this.querySelector("img").src = img;
                }),
                switchMap(img => observeImageLoaded(this.querySelector("img")).pipe(
                    switchMap(loaded => animationFrames().pipe(
                        map(v => v.elapsed / (1000 * duration)),
                        takeWhile(v => v < 1),
                        endWith(1)
                    )),
                    startWith(0),
                    //tap(v => this.style.setProperty(`--animation`, `${v}`))
                ))
            ),
        ).pipe(
            takeUntil(this.disconnected$),
        ).subscribe();*/

        this.offsetHeight;
        this.classList.add("visible");
    }

    disconnectedCallback() {
        this.disconnected$.next();
    }

    setImage(img: string) {
        this.image$.next(img);
    }
}