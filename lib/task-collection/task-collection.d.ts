import { ArgsNum } from '../utils';
export declare function _fast_remove_single(arr: any[], index: number): void;
export declare class TaskCollection<Func extends (...args: any) => void, AwaitTasks extends true | false = false> {
    readonly awaitTasks: AwaitTasks;
    constructor(argsNum: ArgsNum<Func>, autoRebuild?: boolean, initialTasks?: (Func[]) | Func | null, awaitTasks?: AwaitTasks);
    /** DO NOT CHANGE DIRECTLY */
    _tasks: (Func[]) | Func | null;
    /** cached */
    length: number;
    /** auto rebuild on first emit call; otherwise autorebuild on every change */
    firstEmitBuildStrategy: boolean;
    readonly argsNum: ArgsNum<Func>;
    autoRebuild: boolean;
    readonly growArgsNum: typeof growArgsNum;
    setAutoRebuild: typeof setAutoRebuild;
    call: (...args: Parameters<Func>) => (AwaitTasks extends true ? Promise<void> : void);
    rebuild: () => void;
    push: (...func: Func[]) => void;
    /** remove last matched task from tasks */
    removeLast: (func: Func) => void;
    insert: (index: number, ...func: Func[]) => void;
    setTasks: (tasks: Func[]) => void;
    tasksAsArray: () => Func[];
    /** this autorebuilds */
    readonly clear: typeof clear;
    /** this autorebuilds */
    readonly fastClear: typeof fastClear;
}
declare function fastClear<Func extends (...args: any) => void, AwaitTasks extends true | false = false>(this: TaskCollection<Func, AwaitTasks>): void;
declare function clear<Func extends (...args: any) => void, AwaitTasks extends true | false = false>(this: TaskCollection<Func, AwaitTasks>): void;
declare function growArgsNum<Func extends (...args: any) => void, AwaitTasks extends true | false = false>(this: TaskCollection<Func, AwaitTasks>, argsNum: number): void;
declare function setAutoRebuild<Func extends (...args: any) => void, AwaitTasks extends true | false = false>(this: TaskCollection<Func, AwaitTasks>, newVal: boolean): void;
export {};
