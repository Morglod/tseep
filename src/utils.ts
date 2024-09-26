
export function nullObj() {
    const x = {};
    (x as any).__proto__ = null;
    return x;
}

export type ArgsNum<T extends (...args: any[]) => any> = T extends (...args: infer K) => any ? K["length"] : never;
