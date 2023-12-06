import { Observable } from "rxjs";
import StateObject from "./state-object";

export default class Route<T> {
    test: RegExp;
    handler: (state: StateObject, ...params: string[]) => Observable<T>;
}