"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNativeFuncCode(funcCode) {
    return (funcCode.endsWith(') { [native code] }'));
}
exports.isNativeFuncCode = isNativeFuncCode;
/**
 * inlining call should not have any special chars in args!!
 * args of inlining calls should have unique names
 */
function _unsafe_inliner(func, inlineCallsOf, define) {
    if (define === void 0) { define = false; }
    var funcCode = func.toString();
    if (isNativeFuncCode(funcCode)) {
        throw new Error('func should not be native');
    }
    /** funcName -> prepared func body, without open brace */
    var prepared = {};
    for (var i = 0; i < inlineCallsOf.length; ++i) {
        var inlF = inlineCallsOf[i];
        var code = inlF.toString();
        if (isNativeFuncCode(code))
            continue;
        var bodyStartI = code.indexOf('{') + 1;
        var bodyEndI = code.lastIndexOf('}');
        var body = code.substr(bodyStartI, bodyEndI - bodyStartI);
        prepared[inlF.name] = body;
    }
    var funcNames = Object.keys(prepared);
    // pick call heads eg `foo(a,b,c);`
    var regex = new RegExp("(" + funcNames.join('|') + ")\\;", 'g');
    var patchedFuncCode = funcCode.replace(regex, function (substr, funcName, funcArgs) {
        var f = prepared[funcName];
        if (!f)
            return substr;
        return f;
    });
    if (define) {
        return '(' + patchedFuncCode + ')';
    }
    else {
        return eval('(' + patchedFuncCode + ')');
    }
}
exports._unsafe_inliner = _unsafe_inliner;
//# sourceMappingURL=inliner.js.map