import { ArgsNum, Args } from 'tsargs';

export const BAKED_EMPTY_FUNC = (function(){});

let FORLOOP_FALLBACK = 20000;

export function bakeCollection<Func extends (...args: any) => void>(
    collection: Func[],
    fixedArgsNum: ArgsNum<Func>,
): (...args: Args<Func>) => void {
    if (collection.length === 0) return BAKED_EMPTY_FUNC;
    else if (collection.length === 1) return collection[0];

    let funcFactoryCode: string;

    if (collection.length < FORLOOP_FALLBACK) {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        const funcDefCode = collection.map((_, i) => `var f${i} = collection[${i}];`).join('\n');
        const funcCallCode = collection.map((_, i) => `f${i}(${argsDefCode})`).join('\n');

        funcFactoryCode = `(function(collection) {
            ${funcDefCode}
            collection = undefined;
            return (function(${argsDefCode}) {
                ${funcCallCode}
            });
        })`;
    } else {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        funcFactoryCode = `(function(collection) {
            return (function(${argsDefCode}) {
                for (var i = 0; i < collection.length; ++i) {
                    collection[i](${argsDefCode});
                }
            });
        })`;
    }

    {
        // isolate
        const bakeCollection = undefined;
        const fixedArgsNum = undefined;
        const bakeCollectionVariadic = undefined;
        const bakeCollectionAwait = undefined;

        const funcFactory = eval(funcFactoryCode);
        return funcFactory(collection);
    }
}

export function bakeCollectionAwait<Func extends (...args: any) => void>(
    collection: Func[],
    fixedArgsNum: ArgsNum<Func>,
): (...args: Args<Func>) => Promise<void> {
    if (collection.length === 0) return BAKED_EMPTY_FUNC as any;
    else if (collection.length === 1) return collection[0] as any;
    
    let funcFactoryCode: string;

    if (collection.length < FORLOOP_FALLBACK) {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        const funcDefCode = collection.map((_, i) => `var f${i} = collection[${i}];`).join('\n');
        const funcCallCode = collection.map((_, i) => `f${i}(${argsDefCode})`).join(', ');

        funcFactoryCode = `(function(collection) {
            ${funcDefCode}
            collection = undefined;
            return (function(${argsDefCode}) {
                return Promise.all([ ${funcCallCode} ]);
            });
        })`;
    } else {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        funcFactoryCode = `(function(collection) {
            return (function(${argsDefCode}) {
                var promises = Array(collection.length);
                for (var i = 0; i < collection.length; ++i) {
                    promises[i] = collection[i](${argsDefCode});
                }
                return Promise.all(promises);
            });
        })`;
    }

    {
        // isolate
        const bakeCollection = undefined;
        const collection = undefined;
        const fixedArgsNum = undefined;
        const bakeCollectionVariadic = undefined;
        const bakeCollectionAwait = undefined;

        const funcFactory = eval(funcFactoryCode);
        return funcFactory(collection);
    }
}

export function bakeCollectionVariadic<Func extends (...args: any) => void>(
    collection: Func[],
): (...args: Args<Func>) => void {
    if (collection.length === 0) return BAKED_EMPTY_FUNC;
    else if (collection.length === 1) return collection[0];

    let funcFactoryCode: string;

    if (collection.length < FORLOOP_FALLBACK) {
        const funcDefCode = collection.map((_, i) => `var f${i} = collection[${i}];`).join('\n');
        const funcCallCode = collection.map((_, i) => `f${i}.apply(undefined, arguments)`).join('\n');

        funcFactoryCode = `(function(collection) {
            ${funcDefCode}
            collection = undefined;
            return (function() {
                ${funcCallCode}
            });
        })`;
    } else {
        funcFactoryCode = `(function(collection) {
            return (function() {
                for (var i = 0; i < collection.length; ++i) {
                    collection[i].apply(undefined, arguments);
                }
            });
        })`;
    }

    {
        // isolate
        const bakeCollection = undefined;
        const collection = undefined;
        const fixedArgsNum = undefined;
        const bakeCollectionVariadic = undefined;
        const bakeCollectionAwait = undefined;

        const funcFactory = eval(funcFactoryCode);
        return funcFactory(collection);
    }
}