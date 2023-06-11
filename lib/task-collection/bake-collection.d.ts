import { ArgsNum } from "../utils";
export declare const BAKED_EMPTY_FUNC: () => void;
export declare function bakeCollection<Func extends (...args: any) => void>(collection: Func[], fixedArgsNum: ArgsNum<Func>): (...args: Parameters<Func>) => void;
export declare function bakeCollectionAwait<Func extends (...args: any) => void>(collection: Func[], fixedArgsNum: ArgsNum<Func>): (...args: Parameters<Func>) => Promise<void>;
export declare function bakeCollectionVariadic<Func extends (...args: any) => void>(collection: Func[]): (...args: Parameters<Func>) => void;
