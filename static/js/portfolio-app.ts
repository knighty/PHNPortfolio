import { BehaviorSubject, Observable, finalize, tap } from "rxjs";
import App from "./app";
import Route from "./route";
import PageView from "./pages/page";
import IndexView from "./pages";
import StateObject from "./state-object";

export default class PortfolioApp extends App {
    constructor() {
        super();
    }

    genericRoute<T extends PageView<any>>(element: string, title?: string): Observable<T> {
        const view = (document.createElement(element) as T);
        const o = new BehaviorSubject(view);
        return o.pipe(
            tap(view => {
                this.title$.next(title);
                this.appendChild(view);
            }),
            finalize(() => {
                view.saveState();
                view.classList.add("remove");
                setTimeout(() => this.removeChild(view), 500);
            })
        );
    }

    showIndex(state: StateObject) {
        return this.genericRoute<IndexView>("x-index", "Home");
    }

    getRoutes(): Route<any>[] {
        return [
            {
                test: /^\/$/,
                handler: (state: StateObject) => this.showIndex(state)
            },
            /*{
                test: /^\/remnant$/,
                handler: (state: StateObject) => this.showRemnant(state)
            },
            {
                test: /^\/recipe\/([a-z0-9\-]*)$/,
                handler: (state: StateObject, url: string, id: string) => this.recipeRepository.findById(id).pipe(
                    switchMap(recipe => this.showRecipe(state, recipe))
                )
            }*/
        ]
    }
}