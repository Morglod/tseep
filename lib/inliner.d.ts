export declare function isNativeFuncCode(funcCode: string): boolean;
/**
 * inlining call should not have any special chars in args!!
 * args of inlining calls should have unique names
 */
export declare function _unsafe_inliner<T extends Function>(func: T, inlineCallsOf: Function[], define?: false | 'def'): any;
