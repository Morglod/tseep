import { ArgsNum, Args } from 'tsargs';
import { _unsafe_inliner } from './inliner';

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

function push_norebuild__tasks_array<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    if (b) { // if multiple args
        var _a;
        (_a = this._tasks as Func[]).push.apply(_a, arguments);
        this.length += arguments.length;
    } else { // if single arg (most often case)
        (this._tasks as Func[]).push(a);
        this.length++;
    }
}

function push_norebuild__tasks_single<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    if (b) { // if multiple args
        const newAr = Array(1 + arguments.length);
        newAr.push(newAr);
        newAr.push.apply(newAr, arguments);
        this._tasks = newAr;
        this.length += arguments.length;
    } else { // if single arg (most often case)
        this._tasks = [ this._tasks as Func, a ];
        this.length++;
    }
    this.push = push_norebuild__tasks_array;
}

function push_norebuild__tasks_null<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    if (b) { // if multiple args
        const newAr = Array(arguments.length);
        newAr.push.apply(newAr, arguments);
        this._tasks = newAr;
        this.length += arguments.length;
    } else { // if single arg (most often case)
        this._tasks = a;
        this.length++;
    }
    this.push = push_norebuild__tasks_single;
}

let push_rebuild__tasks_array = function push_rebuild__tasks_array<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    push_norebuild__tasks_array;

    if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    else this.rebuild();
}

push_rebuild__tasks_array = eval(_unsafe_inliner(push_rebuild__tasks_array, [ push_norebuild__tasks_array ], 'def'));

let push_rebuild__tasks_single = function push_rebuild__tasks_single<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    push_norebuild__tasks_single;
    this.push = push_rebuild__tasks_array;
    this.removeLast = removeLast_rebuild__array;

    if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    else this.rebuild();
}

push_rebuild__tasks_single = eval(_unsafe_inliner(push_rebuild__tasks_single, [ push_norebuild__tasks_single ], 'def'));

let push_rebuild__tasks_null = function push_rebuild__tasks_null<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func, b?: Func /*, ...func: Func[] */) {
    push_norebuild__tasks_null;
    this.push = push_rebuild__tasks_single;
    this.removeLast = removeLast_rebuild__single;

    if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    else this.rebuild();
}

push_rebuild__tasks_null = eval(_unsafe_inliner(push_rebuild__tasks_null, [ push_norebuild__tasks_null ], 'def'));

export function _fast_remove_single(arr: any[], index: number) {
    if (index === -1) return;
    if (index === 0) arr.shift();
    else if (index === arr.length - 1) arr.length = arr.length - 1;
    else arr.splice(index, 1);
}

function removeLast_norebuild__array<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
    _fast_remove_single(this._tasks as Func[], (this._tasks as Func[]).lastIndexOf(a));
    if (this._tasks.length === 1) {
        this._tasks = this._tasks[0];
        this.length = 1;
        this.removeLast = removeLast_rebuild__single;
        this.push = push_rebuild__tasks_single;
    }
    else this.length = this._tasks.length;
}

function removeLast_norebuild__single<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
    if (this._tasks === a) {
        this.length = 0;
        this.removeLast = removeLast_rebuild__null;
        this.push = push_rebuild__tasks_null;
    }
}

function removeLast_norebuild__null<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
}

let removeLast_rebuild__array = function removeLast_rebuild__array<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
    removeLast_norebuild__array;

    if (this.firstEmitBuildStrategy)this.call = rebuild_on_first_call;
    else this.rebuild();
}

removeLast_rebuild__array = eval(_unsafe_inliner(removeLast_rebuild__array, [ removeLast_norebuild__array ], 'def'));


let removeLast_rebuild__single = function removeLast_rebuild__single<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
    removeLast_norebuild__single;

    if (this.firstEmitBuildStrategy)this.call = rebuild_on_first_call;
    else this.rebuild();
}

removeLast_rebuild__single = eval(_unsafe_inliner(removeLast_rebuild__single, [ removeLast_norebuild__single ], 'def'));


let removeLast_rebuild__null = function removeLast_rebuild__null<Func extends (...args: any) => void>(this: TaskCollection<Func>, a: Func) {
    removeLast_norebuild__null;

    if (this.firstEmitBuildStrategy)this.call = rebuild_on_first_call;
    else this.rebuild();
}

removeLast_rebuild__null = eval(_unsafe_inliner(removeLast_rebuild__null, [ removeLast_norebuild__null ], 'def'));

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
    insert_norebuild;

    if (this.firstEmitBuildStrategy) this.call = rebuild_on_first_call;
    else this.rebuild();
}

_unsafe_inliner(insert_rebuild, [ insert_norebuild ], 'def');

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
        
        this.setAutoRebuild(autoRebuild);
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
        if (this.length === 0) {
            this.push = push_rebuild__tasks_null.bind(this);
            this.insert = insert_rebuild.bind(this);
            this.removeLast = removeLast_rebuild__null.bind(this);
        } else if (this.length === 1) {
            this.push = push_rebuild__tasks_single.bind(this);
            this.insert = insert_rebuild.bind(this);
            this.removeLast = removeLast_rebuild__single.bind(this);
        } else {
            this.push = push_rebuild__tasks_array.bind(this);
            this.insert = insert_rebuild.bind(this);
            this.removeLast = removeLast_rebuild__array.bind(this);
        }
    } else {
        if (this.length === 0) {
            this.push = push_norebuild__tasks_null.bind(this);
            this.insert = insert_norebuild.bind(this);
            this.removeLast = removeLast_norebuild__null.bind(this);
        } else if (this.length === 1) {
            this.push = push_norebuild__tasks_single.bind(this);
            this.insert = insert_norebuild.bind(this);
            this.removeLast = removeLast_norebuild__single.bind(this);
        } else {
            this.push = push_norebuild__tasks_array.bind(this);
            this.insert = insert_norebuild.bind(this);
            this.removeLast = removeLast_norebuild__array.bind(this);
        }
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
        this.call = EMPTY_FUNC as any;
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

(TaskCollection.prototype as any).fastClear = fastClear as any;
(TaskCollection.prototype as any).clear = clear as any;
(TaskCollection.prototype as any).growArgsNum = growArgsNum as any;
(TaskCollection.prototype as any).setAutoRebuild = setAutoRebuild as any;
(TaskCollection.prototype as any).tasksAsArray = tasksAsArray as any;
(TaskCollection.prototype as any).setTasks = setTasks as any;