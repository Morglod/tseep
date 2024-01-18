import { ArgsNum } from "../utils";

export const BAKED_EMPTY_FUNC = (function(){});

let FORLOOP_FALLBACK = 1500;

function generateArgsDefCode(numArgs: number) {
    let argsDefCode = '';
    if (numArgs === 0) return argsDefCode;
    for (let i = 0; i < numArgs - 1; ++i) {
        argsDefCode += ('arg' + String(i) + ', ');
    }
    argsDefCode += ('arg' + String(numArgs - 1));
    return argsDefCode;
}

function generateBodyPartsCode(argsDefCode: string, collectionLength: number) {
    let funcDefCode = '', funcCallCode = '';
    for (let i = 0; i < collectionLength; ++i) {
        funcDefCode += `var f${i} = collection[${i}];\n`;
        funcCallCode += `f${i}(${argsDefCode})\n`;
    }
    return { funcDefCode, funcCallCode };
}

function generateBodyPartsVariadicCode(collectionLength: number) {
    let funcDefCode = '', funcCallCode = '';
    for (let i = 0; i < collectionLength; ++i) {
        funcDefCode += `var f${i} = collection[${i}];\n`;
        funcCallCode += `f${i}.apply(undefined, arguments)\n`;
    }
    return { funcDefCode, funcCallCode };
}

export function bakeCollection<Func extends (...args: any) => void>(
    collection: Func[],
    fixedArgsNum: ArgsNum<Func>,
): (...args: Parameters<Func>) => void {
    if (collection.length === 0) return BAKED_EMPTY_FUNC;
    else if (collection.length === 1) return collection[0];

    let funcFactoryCode: string;

    if (collection.length < FORLOOP_FALLBACK) {
        const argsDefCode = generateArgsDefCode(fixedArgsNum);
        const { funcDefCode, funcCallCode } = generateBodyPartsCode(argsDefCode, collection.length);

        funcFactoryCode = `(function(collection) {
            ${funcDefCode}
            collection = undefined;
            return (function(${argsDefCode}) {
                ${funcCallCode}
            });
        })`;
    } else {
        const argsDefCode = generateArgsDefCode(fixedArgsNum);

        // loop unroll
        
        if (collection.length % 10 === 0) {
            funcFactoryCode = `(function(collection) {
                return (function(${argsDefCode}) {
                    for (var i = 0; i < collection.length; i += 10) {
                        collection[i](${argsDefCode});
                        collection[i+1](${argsDefCode});
                        collection[i+2](${argsDefCode});
                        collection[i+3](${argsDefCode});
                        collection[i+4](${argsDefCode});
                        collection[i+5](${argsDefCode});
                        collection[i+6](${argsDefCode});
                        collection[i+7](${argsDefCode});
                        collection[i+8](${argsDefCode});
                        collection[i+9](${argsDefCode});
                    }
                });
            })`;
        } else if (collection.length % 4 === 0) {
            funcFactoryCode = `(function(collection) {
                return (function(${argsDefCode}) {
                    for (var i = 0; i < collection.length; i += 4) {
                        collection[i](${argsDefCode});
                        collection[i+1](${argsDefCode});
                        collection[i+2](${argsDefCode});
                        collection[i+3](${argsDefCode});
                    }
                });
            })`;
        } else if (collection.length % 3 === 0) {
            funcFactoryCode = `(function(collection) {
                return (function(${argsDefCode}) {
                    for (var i = 0; i < collection.length; i += 3) {
                        collection[i](${argsDefCode});
                        collection[i+1](${argsDefCode});
                        collection[i+2](${argsDefCode});
                    }
                });
            })`;
        } else {
            funcFactoryCode = `(function(collection) {
                return (function(${argsDefCode}) {
                    for (var i = 0; i < collection.length; ++i) {
                        collection[i](${argsDefCode});
                    }
                });
            })`;
        }
    }

    {
        // isolate
        const bakeCollection = undefined;
        const fixedArgsNum = undefined;
        const bakeCollectionVariadic = undefined;
        const bakeCollectionAwait = undefined;

        const funcFactory = eval(funcFactoryCode) as Function;
        return funcFactory(collection);
    }
}

export function bakeCollectionAwait<Func extends (...args: any) => void>(
    collection: Func[],
    fixedArgsNum: ArgsNum<Func>,
): (...args: Parameters<Func>) => Promise<void> {
    if (collection.length === 0) return BAKED_EMPTY_FUNC as any;
    else if (collection.length === 1) return collection[0] as any;
    
    let funcFactoryCode: string;

    if (collection.length < FORLOOP_FALLBACK) {
        const argsDefCode = generateArgsDefCode(fixedArgsNum);
        const { funcDefCode, funcCallCode } = generateBodyPartsCode(argsDefCode, collection.length);

        funcFactoryCode = `(function(collection) {
            ${funcDefCode}
            collection = undefined;
            return (function(${argsDefCode}) {
                return Promise.all([ ${funcCallCode} ]);
            });
        })`;
    } else {
        const argsDefCode = generateArgsDefCode(fixedArgsNum);
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
        const fixedArgsNum = undefined;
        const bakeCollectionVariadic = undefined;
        const bakeCollectionAwait = undefined;

        const funcFactory = eval(funcFactoryCode) as Function;
        return funcFactory(collection);
    }
}

export function bakeCollectionVariadic<Func extends (...args: any) => void>(
    collection: Func[],
): (...args: Parameters<Func>) => void {
    if (collection.length === 0) return BAKED_EMPTY_FUNC;
    else if (collection.length === 1) return collection[0];

    let funcFactoryCode: string;

    if (collection.length < FORLOOP_FALLBACK) {
        const { funcDefCode, funcCallCode } = generateBodyPartsVariadicCode(collection.length); 

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
        const fixedArgsNum = undefined;
        const bakeCollectionVariadic = undefined;
        const bakeCollectionAwait = undefined;

        const funcFactory = eval(funcFactoryCode) as Function;
        return funcFactory(collection);
    }
}