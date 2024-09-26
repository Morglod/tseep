export type NoReadonly<T extends { [x: string]: any }> = {
    -readonly [X in keyof T]: T[X]
};

export function _fast_remove_single(arr: any[], index: number) {
    if (index === -1) return;
    if (index === 0) arr.shift();
    else if (index === arr.length - 1) arr.length = arr.length - 1;
    else arr.splice(index, 1);
}
