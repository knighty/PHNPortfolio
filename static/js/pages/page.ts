import { Observable, ReplaySubject, takeUntil } from "rxjs";
import { ValueElement } from "../utils";

type PickByValue<T, V> = {
    [P in keyof T as T[P] extends V | undefined ? P : never]: T[P]
}


export default class PageView<Elements extends {
    [key: PropertyKey]: HTMLElement
}> extends HTMLElement {
    disconnected$ = new ReplaySubject<void>(1);

    constructor() {
        super();
    }

    element<T extends keyof Elements>(name: T) {
        const element = this.querySelector(`[data-element="${String(name)}"], [name=${String(name)}]`) as Elements[T];
        if (element == null)
            throw Error(`Could not find element "${String(name)}"`)
        return element;
    }

    input<T extends PickByValue<Elements, ValueElement>>(name: keyof T) {
        const element = this.querySelector(`[data-element="${String(name)}"], [name=${String(name)}]`) as T[typeof name];
        //                                                                                                ^?
        if (element == null)
            throw Error(`Could not find element "${String(name)}"`)
        return element;
    }

    setState(state: any) {
    }

    saveState() {
    }

    disconnectedCallback() {
        this.disconnected$.next();
    }

    subscribe(observable: Observable<any>) {
        return observable.pipe(
            takeUntil(this.disconnected$)
        ).subscribe();
    }
}