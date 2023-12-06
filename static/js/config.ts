import { Observable, Subject, distinctUntilChanged, filter, fromEvent, map, mapTo, shareReplay, startWith, switchMap, tap } from "rxjs";
import { AnyDictionary } from "./types";
import { fromDomEvent } from "./utils";

export const config: Config = {
    sources: [
        "/recipes.txt",
        "/recipes-chicken.txt"
    ],
}

type SetConfigTuple = [key: string, value: any];

const setConfigValue$ = new Subject<SetConfigTuple>();

setConfigValue$.pipe(
    map((v: SetConfigTuple) => "hello")
)

const localStorageUpdated$ = fromDomEvent(window, "storage").pipe(
    filter(e => e.key == "config")
);

export type Config = Partial<{
    fontSize: number,
    theme: string,
    voice: string,
    sources: string[]
}>;

type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
export type TypedConfig<T> = {
    [Key in FilteredKeys<Config, T>]: Config[Key]
}

type test = TypedConfig<number>;

const baseConfig = {
    fontSize: 11,
};

export const localConfig$ = localStorageUpdated$.pipe(
    startWith(true),
    map(() => localStorage.getItem("config")),
    map(str => str ? JSON.parse(str) : {}),
    map(config => ({ baseConfig, ...config })),
    switchMap(config => {
        return setConfigValue$.pipe(
            tap(([key, value]) => {
                //console.log(`Set ${key} to ${value}`);
                config[key] = value;
                localStorage.setItem("config", JSON.stringify(config))
            }),
            startWith(config),
            mapTo(config)
        )
    }),
    shareReplay(1)
);

localConfig$.subscribe();

export function setConfig<TKey extends keyof Config>(key: TKey, value: Config[TKey]) {
    setConfigValue$.next([key, value]);
}

export function readConfig<TKey extends keyof Config>(key: TKey, def?: Config[TKey]): Observable<Config[TKey]> {
    return localConfig$.pipe(
        map(config => config[key] ?? undefined),
        map(value => value === undefined ? def : value as Config[TKey]),
        distinctUntilChanged()
    );
}