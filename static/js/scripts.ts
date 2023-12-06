import { debounce, debounceTime, distinctUntilChanged, map } from "rxjs";
import IndexView from "./pages";
import PortfolioApp from "./portfolio-app";
import { fromDomEvent } from "./utils";
import Lightbox from "./lightbox";

customElements.define("x-index", IndexView);

customElements.define("x-header", class extends HTMLElement {
    connectedCallback() {
        const logo = require("/static/images/logo.png");
        this.innerHTML = `
            <div class="logo"><span><img src="${logo}"/></span></div>
            <h1>Peter H. Nguyen</h1>
            <h2>Illustrator & Designer & Animator</h2>
        `;
    }
});

customElements.define("x-nav", class extends HTMLElement {
    connectedCallback() {
        fromDomEvent(document, "scroll").pipe(
            map(e => this.getBoundingClientRect().top <= 0),
            distinctUntilChanged(),
        ).subscribe(show => this.classList.toggle("hovering", show));

        this.innerHTML = `
            <nav>
                <ul>
                    <li><a href="#Graphic Design">Design</a></li>
                    <li><a href="#Logo Design">Logos</a></li>
                    <li><a href="#Visualization">Visualization</a></li>
                    <li><a href="#Illustration">illustration</a></li>
                    <li><a href="#Motion Graphics">Motion Graphics</a></li>
                    <li><a href="#Contact">Contact</a></li>
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