import { _fast_remove_single, NoReadonly } from './utils';
import { bakeCollection, bakeCollectionAwait, BAKED_EMPTY_FUNC } from './bake-collection';
import { ArgsNum } from '../utils';

function push_norebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    const len = this.length;
    if (len > 1) { // tasks is array
        if (b) { // if multiple args
            var _a;
            (_a = this._tasks as Func[]).push.apply(_a, arguments);
            this.length += arguments.length;
        } else { // if single arg (most often case)
            (this._tasks as Func[]).push(a);
            this.length++;
        }
    } else { // tasks is (function or null)
        if (b) { // if multiple args
            if (len === 1) { // if this._tasks is function
                const newAr = Array(1 + arguments.length);
                newAr.push(newAr);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            } else {
                const newAr = Array(arguments.length);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            }
            this.length += arguments.length;
        } else { // if single arg (most often case)
            if (len === 1) this._tasks = [ this._tasks as Func, a ];
            else this._tasks = a;
            this.length++;
        }
    }
}

function push_rebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    const len = this.length;
    if (len > 1) { // tasks is array
        if (b) { // if multiple args
            var _a;
            (_a = this._tasks as Func[]).push.apply(_a, arguments);
            this.length += arguments.length;
        } else { // if single arg (most often case)
            (this._tasks as Func[]).push(a);
            this.length++;
        }
    } else { // tasks is (function or null)
        if (b) { // if multiple args
            if (len === 1) { // if this._tasks is function
                const newAr = Array(1 + arguments.length);
                newAr.push(newAr);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            } else {
                const newAr = Array(arguments.length);
                newAr.push.apply(newAr, arguments);
                this._tasks = newAr;
            }
            this.length += arguments.length;
        } else { // if single arg (most often case)
            if (len === 1) this._tasks = [ this._tasks as Func, a ];
            else this._tasks = a;
            this.length++;
        }
    }

    if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    else this.rebuild();
}

function removeLast_norebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
    if (this.length === 0) return;
    if (this.length === 1) {
        if (this._tasks === a) {
            this.length = 0;
        }
    } else {
        _fast_remove_single(this._tasks as Func[], (this._tasks as Func[]).lastIndexOf(a));
        if (this._tasks.length === 1) {
            this._tasks = this._tasks[0];
            this.length = 1;
        }
        else this.length = this._tasks.length;
    }
}

function removeLast_rebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
    if (this.length === 0) return;
    if (this.length === 1) {
        if (this._tasks === a) {
            this.length = 0;
        }
        if (this.firstEmitBuildStrategy) {
            this.call = BAKED_EMPTY_FUNC;
            return;
        } else {
            this.rebuild();
            return;
        }
    } else {
        _fast_remove_single(this._tasks as Func[], (this._tasks as Func[]).lastIndexOf(a));
        if (this._tasks.length === 1) {
            this._tasks = this._tasks[0];
            this.length = 1;
        }
        else this.length = this._tasks.length;
    }

    if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    else this.rebuild();
}

function insert_norebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, index: number, ...func: Func[]) {
    if (this.length === 0) {
        this._tasks = func;
        this.length = 1;
    }
    else if (this.length === 1) {
        func.unshift(this._tasks as Func);
        this._tasks = func;
        this.length = this._tasks.length;
    }
    else {
        (this._tasks as Func[]).splice(index, 0, ...func);
        this.length = this._tasks.length;
    }
}

function insert_rebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, index: number, ...func: Func[]) {
    if (this.length === 0) {
        this._tasks = func;
        this.length = 1;
    }
    else if (this.length === 1) {
        func.unshift(this._tasks as Func);
        this._tasks = func;
        this.length = this._tasks.length;
    }
    else {
        (this._tasks as Func[]).splice(index, 0, ...func);
        this.length = this._tasks.length;
    }

    if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    else this.rebuild();
}

function rebuild_noawait<Func extends (...args: any) => void>(this: TaskCollection<Func>) {
    if (this.length === 0) this.call = BAKED_EMPTY_FUNC;
    else if (this.length === 1) this.call = this._tasks as Func;
    else this.call = bakeCollection(this._tasks as Func[], this.argsNum);
}

function rebuild_await<Func extends (...args: any) => void>(this: TaskCollection<Func>) {
    if (this.length === 0) this.call = BAKED_EMPTY_FUNC;
    else if (this.length === 1) this.call = this._tasks as Func;
    else this.call = bakeCollectionAwait(this._tasks as Func[], this.argsNum);
}

function rebuild_on_first_call<Func extends (...args: any) => void>(this: TaskCollection<Func>) {
    this.rebuild();
    this.call.apply(undefined, arguments);
}

export class TaskCollection<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
> {
    constructor(
        argsNum: ArgsNum<Func>,
        autoRebuild: boolean = true,
        initialTasks: (Func[])|Func|null = null,
        public readonly awaitTasks: AwaitTasks = false as AwaitTasks,
    ) {
        this.argsNum = argsNum;
        this.firstEmitBuildStrategy = true;

        if (awaitTasks) this.rebuild = rebuild_await.bind(this);
        else this.rebuild = rebuild_noawait.bind(this);

        this.setAutoRebuild(autoRebuild);

        if (initialTasks) {
            if (typeof initialTasks === 'function') {
                this._tasks = initialTasks;
                this.length = 1;
            } else {
                this._tasks = initialTasks;
                this.length = initialTasks.length;
            }
        } else {
            this._tasks = null;
            this.length = 0;
        }
        
        if (autoRebuild) this.rebuild();
    }

    /** DO NOT CHANGE DIRECTLY */
    _tasks: (Func[])|Func|null;

    /** cached */
    length: number;

    /** auto rebuild on first emit call; otherwise autorebuild on every change */
    firstEmitBuildStrategy: boolean;

    readonly argsNum: ArgsNum<Func>;
    autoRebuild: boolean;

    readonly growArgsNum: typeof growArgsNum;
    setAutoRebuild: typeof setAutoRebuild;

    call: (...args: Parameters<Func>) => (AwaitTasks extends true ? Promise<void> : void) = BAKED_EMPTY_FUNC as any;

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

function fastClear<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
>(this: TaskCollection<Func, AwaitTasks>) {
    this._tasks = null;
    this.length = 0;
    this.call = BAKED_EMPTY_FUNC as any;
}

function clear<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
>(this: TaskCollection<Func, AwaitTasks>) {
    this._tasks = null;
    this.length = 0;
    this.call = BAKED_EMPTY_FUNC as any;
}

function growArgsNum<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
>(this: TaskCollection<Func, AwaitTasks>, argsNum: number) {
    if (this.argsNum < argsNum) {
        (this as any).argsNum = argsNum;

        if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call as any;
        else this.rebuild();
    }
}

function setAutoRebuild<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
>(this: TaskCollection<Func, AwaitTasks>, newVal: boolean) {
    if (newVal) {
        this.push = push_rebuild.bind(this);
        this.insert = insert_rebuild.bind(this);
        this.removeLast = removeLast_rebuild.bind(this);
    } else {
        this.push = push_norebuild.bind(this);
        this.insert = insert_norebuild.bind(this);
        this.removeLast = removeLast_norebuild.bind(this);
    }
};

function tasksAsArray<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
>(this: TaskCollection<Func, AwaitTasks>): Func[] {
    if (this.length === 0) return [];
    if (this.length === 1) return [ this._tasks as Func ];
    return this._tasks as Func[];
}

function setTasks<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
>(this: TaskCollection<Func, AwaitTasks>, tasks: Func[]): void {
    if (tasks.length === 0) {
        this.length = 0;
        this.call = BAKED_EMPTY_FUNC as any;
    } else if (tasks.length === 1) {
        this.length = 1;
        this.call = tasks[0] as any;
        this._tasks = tasks[0];
    } else {
        this.length = tasks.length;
        this._tasks = tasks;
        
        if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call as any;
        else this.rebuild();
    }
}

(TaskCollection.prototype as NoReadonly<TaskCollection<any, any>>).fastClear = fastClear;
(TaskCollection.prototype as NoReadonly<TaskCollection<any, any>>).clear = clear;
(TaskCollection.prototype as NoReadonly<TaskCollection<any, any>>).growArgsNum = growArgsNum;
(TaskCollection.prototype as NoReadonly<TaskCollection<any, any>>).setAutoRebuild = setAutoRebuild;
(TaskCollection.prototype as NoReadonly<TaskCollection<any, any>>).tasksAsArray = tasksAsArray;
(TaskCollection.prototype as NoReadonly<TaskCollection<any, any>>).setTasks = setTasks;