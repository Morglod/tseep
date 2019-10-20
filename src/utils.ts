
export function nullObj() {
    const x = {};
    (x as any).__proto__ = null;
    (x as any).prototype = null;
    return x;
}