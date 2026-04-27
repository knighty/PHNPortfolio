import { animationFrames, asyncScheduler, debounce, debounceTime, distinctUntilChanged, fromEvent, map, merge, pairwise, scan, throttleTime } from "rxjs";
import IndexView from "./pages";
import PortfolioApp from "./portfolio-app";
import { fromDomEvent, observeMousePosition, observeMousePositionOffset } from "./utils";
import Lightbox from "./lightbox";

customElements.define("x-index", IndexView);

customElements.define("x-header", class extends HTMLElement {
    connectedCallback() {
        const logo = require("/static/images/logo.png");
        /*this.innerHTML = `
            <div class="logo"><span><img src="${logo}"/></span></div>
            <h1>Peter H. Nguyen</h1>
            <h2>Illustrator & Designer & Animator</h2>
        `;*/
    }
});

customElements.define("x-blob-button", class extends HTMLElement {
    connectedCallback() {
        /*observeMousePositionOffset(this).subscribe(e => {
            this.style.setProperty(`--x`, `${e.x}px`);
            this.style.setProperty(`--y`, `${e.y}px`);
        })*/

        type State = {
            position: { x: number, y: number },
            desired: { x: number, y: number },
            velocity: { x: number, y: number },
        }
        merge(
            observeMousePositionOffset(this).pipe(
                map(v => (state: State) => {
                    state.desired = { x: v.x, y: v.y }
                    return state;
                })
            ),
            fromEvent(this, "mouseout").pipe(
                map(v => (state: State) => {
                    const rect = this.getBoundingClientRect();
                    state.desired = { x: rect.width / 2, y: rect.height / 2 }
                    return state;
                })
            ),
            animationFrames().pipe(
                map(v => (state: State) => {
                    state.velocity.x += (state.desired.x - state.position.x) / 300;
                    state.velocity.y += (state.desired.y - state.position.y) / 300;

                    state.position.x += state.velocity.x;
                    state.position.y += state.velocity.y;

                    state.velocity.x *= 0.95;
                    state.velocity.y *= 0.95;
                    return state;
                })
            )
        ).pipe(
            scan((state, fn) => fn(state), {
                desired: { x: 0, y: 0 },
                position: { x: 0, y: 0 },
                velocity: { x: 0, y: 0 }
            })
        ).subscribe(state => {
            this.style.setProperty(`--x`, `${state.position.x}px`);
            this.style.setProperty(`--y`, `${state.position.y}px`);
        })
    }
});

customElements.define("x-nav", class extends HTMLElement {
    connectedCallback() {
        fromDomEvent(document, "scroll").pipe(
            map(e => this.getBoundingClientRect().top <= 0),
            distinctUntilChanged(),
        ).subscribe(show => this.classList.toggle("hovering", show));

        fromDomEvent(document, "scroll").pipe(
            throttleTime(300, asyncScheduler, { trailing: true }),
            map(scrollEvent => {
                let e = "";
                for (let element of document.querySelectorAll("section.category")) {
                    if (element.getBoundingClientRect().top < window.outerHeight * 0.5) {
                        e = element.id;
                    }
                }
                return e;
            }),
            distinctUntilChanged(),
            map(selected => this.querySelector(`[href="#${selected}"]`)),
            pairwise(),
        ).subscribe(([a, b]) => {
            if (a !== null)
                a.classList.remove("selected");
            if (b !== null)
                b.classList.add("selected");
        });

        this.innerHTML = `
            <nav>
                <ul>
                    <li><a href="#Graphic Design">Design</a></li>
                    <li><a href="#Logo Design">Logos</a></li>
                    <li><a href="#Visualization">Visualization</a></li>
                    <li><a href="#Illustration">illustration</a></li>
                    <li><a href="#Motion Graphics">Motion Graphics</a></li>
                    <li><a href="mailto:artofphn@gmail.com">Contact</a></li>
                </ul>
            </nav>
        `;
    }
});

customElements.define("x-jump-to-top", class extends HTMLElement {
    connectedCallback() {
        fromDomEvent(document, "scroll").pipe(
            map(e => window.scrollY > 200),
            distinctUntilChanged(),
        ).subscribe(show => this.classList.toggle("visible", show));

        fromDomEvent(this, "click").subscribe(e => window.scrollTo({ top: 0, behavior: 'smooth' }));

        this.innerHTML = `Jump To Top`;
    }
});

customElements.define("x-lightbox", Lightbox);

customElements.define("x-app", PortfolioApp);