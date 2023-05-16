export type NoReadonly<T extends {
    [x: string]: any;
}> = {
    -readonly [X in keyof T]: T[X];
};
