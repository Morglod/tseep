import { ArgsNum, Args } from 'tsargs';
export declare function bakeCollection<Func extends (...args: any) => void>(collection: Func[], fixedArgsNum: ArgsNum<Func>): (args: Args<Func>) => void;
export declare function bakeCollectionAwait<Func extends (...args: any) => void>(collection: Func[], fixedArgsNum: ArgsNum<Func>): (args: Args<Func>) => Promise<void>;
export declare class TaskCollection<Func extends (...args: any) => void, AwaitTasks extends true | false = false> {
    readonly awaitTasks: AwaitTasks;
    constructor(argsNum: ArgsNum<Func>, autoRebuild?: boolean, awaitTasks?: AwaitTasks);
    _tasks: Func[];
    readonly tasks: ReadonlyArray<Func>;
    readonly length: number;
    readonly argsNum: ArgsNum<Func>;
    private _autoRebuild;
    autoRebuild: boolean;
    call: (args: Args<Func>) => (AwaitTasks extends true ? Promise<void> : void);
    rebuild: () => void;
    push: (...func: Func[]) => void;
    remove: (...func: Func[]) => void;
    insert: (index: number, ...func: Func[]) => void;
    /** this autorebuilds */
    readonly clear: () => void;
}
