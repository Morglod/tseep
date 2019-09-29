import { ArgsNum, Args } from 'tsargs';

const EMPTY_FUNC = (function(){});

export function bakeCollection<Func extends (...args: any) => void>(
    collection: Func[],
    fixedArgsNum: ArgsNum<Func>,
): (...args: Args<Func>) => void {
    if (collection.length === 0) return EMPTY_FUNC;
    else if (collection.length === 1) return collection[0];

    let funcFactoryCode: string;

    {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        const funcDefCode = collection.map((_, i) => `var f${i} = collection[${i}];`).join('\n');
        const funcCallCode = collection.map((_, i) => `f${i}(${argsDefCode})`).join('\n');

        funcFactoryCode = `(function() {
            ${funcDefCode}
            return (function(${argsDefCode}) {
                ${funcCallCode}
            });
        })`;
    }

    // isolate eval
    const bakeCollection = undefined;
    const funcFactory = eval(funcFactoryCode);
    return funcFactory();
}

export function bakeCollectionAwait<Func extends (...args: any) => void>(
    collection: Func[],
    fixedArgsNum: ArgsNum<Func>,
): (...args: Args<Func>) => Promise<void> {
    if (collection.length === 0) return EMPTY_FUNC as any;
    else if (collection.length === 1) return collection[0] as any;
    
    let funcFactoryCode: string;

    {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        const funcDefCode = collection.map((_, i) => `var f${i} = collection[${i}];`).join('\n');
        const funcCallCode = collection.map((_, i) => `f${i}(${argsDefCode})`).join(', ');

        funcFactoryCode = `(function() {
            ${funcDefCode}
            return (function(${argsDefCode}) {
                return Promise.all([ ${funcCallCode} ]);
            });
        })`;
    }

    // isolate eval
    const bakeCollection = undefined;
    const funcFactory = eval(funcFactoryCode);
    return funcFactory();
}

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

export function _fast_remove_single(arr: any[], index: number) {
    if (index === -1) return;
    if (index === 0) arr.shift();
    else if (index === arr.length - 1) arr.length = arr.length - 1;
    else arr.splice(index, 1);
}

function remove_norebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    // if (this.length === 0) return;
    // if (b) {
    //     let rest = [];
    //     for (var i = 0; i < arguments.length; i++) {
    //         rest[i] = arguments[i];
    //     }
    //     this.tasks = this.tasks.filter(x => !rest.includes(x));
    // }
    // else {
    //     if (this.length === 1) {
    //         if (this._tasks === a) {
    //             this.length = 0;
    //         }
    //     } else {
    //         _fast_remove_single(this._tasks as Func[], (this._tasks as Func[]).lastIndexOf(a));
    //     }
    // }
}

function remove_rebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    // if (this.tasks.length === 0) return;
    // if (b) {
    //     let rest = [];
    //     for (var i = 0; i < arguments.length; i++) {
    //         rest[i] = arguments[i];
    //     }
    //     this.tasks = this.tasks.filter(x => !rest.includes(x));
    // } else {
    //     if (this.tasks.length === 1 && this.tasks[0] === a) {
    //         this.tasks = [];
    //     } else {
    //         _fast_remove_single(this.tasks, this.tasks.indexOf(a));
    //     }
    // }

    // if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    // else this.rebuild();
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
    } else {
        _fast_remove_single(this._tasks as Func[], (this._tasks as Func[]).lastIndexOf(a));
        if (this._tasks.length === 1) {
            this._tasks = this._tasks[0];
            this.length = 1;
        }
        else this.length = this._tasks.length;
    }

    if (this.firstEmitBuildStrategy)this.call = rebuild_on_first_call;
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
    if (this.length === 0) this.call = EMPTY_FUNC;
    else if (this.length === 1) this.call = this._tasks as Func;
    else this.call = bakeCollection(this._tasks as Func[], this.argsNum);
}

function rebuild_await<Func extends (...args: any) => void>(this: TaskCollection<Func>) {
    if (this.length === 0) this.call = EMPTY_FUNC;
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

    call: (...args: Args<Func>) => (AwaitTasks extends true ? Promise<void> : void) = EMPTY_FUNC as any;

    rebuild: () => void;

    push: (...func: Func[]) => void;
    remove: (...func: Func[]) => void;
    removeLast: (func: Func) => void;
    insert: (index: number, ...func: Func[]) => void;

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
    this.call = EMPTY_FUNC as any;
}

function clear<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
>(this: TaskCollection<Func, AwaitTasks>) {
    this._tasks = null;
    this.length = 0;
    this.call = EMPTY_FUNC as any;
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
        this.remove = remove_rebuild.bind(this);
        this.insert = insert_rebuild.bind(this);
        this.removeLast = removeLast_rebuild.bind(this);
    } else {
        this.push = push_norebuild.bind(this);
        this.remove = remove_norebuild.bind(this);
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

(TaskCollection.prototype as any).fastClear = fastClear as any;
(TaskCollection.prototype as any).clear = clear as any;
(TaskCollection.prototype as any).growArgsNum = growArgsNum as any;
(TaskCollection.prototype as any).setAutoRebuild = setAutoRebuild as any;
(TaskCollection.prototype as any).tasksAsArray = tasksAsArray as any;