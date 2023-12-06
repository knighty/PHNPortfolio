import { switchMap, map, distinctUntilChanged, tap } from "rxjs";
import { currentPage$ } from "./history";
import Route from "./route";

export default class Router {
    routes: Route<any>[];

    constructor(routes: Route<any>[]) {
        this.routes = routes;
    }

    init() {
        currentPage$.pipe(
            distinctUntilChanged(((a, b) => a.uri == b.uri)),
            map(e => {
                const path = e.uri;
                const state = e.state;
        
                for (const route of this.routes) {
                    const matches = route.test.exec(path);
                    if (matches) {
                        return route.handler(state, ...matches);
                    }
                }
                throw new Error(`Non matching route "${path}"`);
            }),
            switchMap(route => route)
        ).subscribe();
    }
}