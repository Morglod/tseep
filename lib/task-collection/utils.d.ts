export type NoReadonly<T extends {
    [x: string]: any;
}> = {
    -readonly [X in keyof T]: T[X];
};
export declare function _fast_remove_single(arr: any[], index: number): void;
