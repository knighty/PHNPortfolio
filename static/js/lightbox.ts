import { ReplaySubject, fromEvent, takeUntil } from "rxjs"

export default class Lightbox extends HTMLElement {
    disconnected$ = new ReplaySubject<void>(1);

    connectedCallback() {
        fromEvent(this, "click").pipe(takeUntil(this.disconnected$)).subscribe(() => this.parentElement.removeChild(this));
    }

    disconnectedCallback() {
        this.disconnected$.next();
    }

    setImage(img: string) {
        this.innerHTML = `<article><img title="Click to close" src="${img}" /></article>`
    }
}