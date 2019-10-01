export function isNativeFuncCode(funcCode: string) {
    return (funcCode.endsWith(') { [native code] }'));
}

/**
 * inlining call should not have any special chars in args!!  
 * args of inlining calls should have unique names
 */
export function _unsafe_inliner<T extends Function>(func: T, inlineCallsOf: Function[], define: false|'def' = false): any {
    const funcCode = func.toString();
    if (isNativeFuncCode(funcCode)) {
        throw new Error('func should not be native');
    }

    /** funcName -> prepared func body, without open brace */
    const prepared: {
        [funcName: string]: string
    } = {};

    for (let i = 0; i < inlineCallsOf.length; ++i) {
        const inlF = inlineCallsOf[i];
        const code = inlF.toString();
        if (isNativeFuncCode(code)) continue;

        const bodyStartI = code.indexOf('{') + 1;
        const bodyEndI = code.lastIndexOf('}');
        const body = code.substr(bodyStartI, bodyEndI - bodyStartI);

        prepared[inlF.name] = body;
    }

    const funcNames = Object.keys(prepared);

    // pick call heads eg `foo(a,b,c);`
    const regex = new RegExp(`(${funcNames.join('|')})\\;`, 'g');

    const patchedFuncCode = funcCode.replace(regex, (substr, funcName, funcArgs) => {
        const f = prepared[funcName];
        if (!f) return substr;
        return f;
    });

    if (define) {
        return '(' + patchedFuncCode + ')';
    } else {
        return eval('(' + patchedFuncCode + ')');
    }
}
