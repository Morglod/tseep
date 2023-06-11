export declare function nullObj(): {};
export type ArgsNum<T extends (...args: any[]) => any> = T extends (...args: infer K) => any ? K["length"] : never;
