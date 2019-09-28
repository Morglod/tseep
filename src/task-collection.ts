import { ArgsNum, Args } from 'tsargs';

const EMPTY_FUNC = function(){};

export function bakeCollection<Func extends (...args: any) => void>(
    collection: Func[],
    fixedArgsNum: ArgsNum<Func>,
): (args: Args<Func>) => void {
    if (collection.length === 0) return EMPTY_FUNC;

    let funcFactoryCode: string;

    {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        const argsGetCode = Array.from({ length: fixedArgsNum}).map((_, i) => `var arg${i} = args[${i}]`).join(';\n');
        const funcDefCode = collection.map((_, i) => `var f${i} = collection[${i}];`).join('\n');
        const funcCallCode = collection.map((_, i) => `f${i}(${argsDefCode})`).join('\n');

        funcFactoryCode = `(function() {
            ${funcDefCode}
            return (function(args) {
                ${argsGetCode}
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
): (args: Args<Func>) => Promise<void> {
    let funcFactoryCode: string;

    {
        const argsDefCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i}`).join(', ');
        const argsGetCode = Array.from({ length: fixedArgsNum}).map((_, i) => `arg${i} = args[${i}]`).join(';\n');
        const funcDefCode = collection.map((_, i) => `var f${i} = collection[${i}];`).join('\n');
        const funcCallCode = collection.map((_, i) => `f${i}(${argsDefCode})`).join(', ');

        funcFactoryCode = `(function() {
            ${funcDefCode}
            return (function(args) {
                ${argsGetCode}
                return Promise.all([ ${funcCallCode} ]);
            });
        })`;
    }

    // isolate eval
    const bakeCollection = undefined;
    const funcFactory = eval(funcFactoryCode);
    return funcFactory();
}

function push_norebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, ...func: Func[]) {
    this._tasks.push(...func);
}
function push_rebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, ...func: Func[]) {
    this._tasks.push(...func);
    this.rebuild();
}

function remove_norebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, ...func: Func[]) {
    this._tasks = this._tasks.filter(x => func.includes(x));
}
function remove_rebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, ...func: Func[]) {
    this._tasks = this._tasks.filter(x => func.includes(x));
    this.rebuild();
}

function insert_norebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, index: number, ...func: Func[]) {
    this._tasks.splice(index, 0, ...func);
}
function insert_rebuild<Func extends (...args: any) => void>(this: TaskCollection<Func>, index: number, ...func: Func[]) {
    this._tasks.splice(index, 0, ...func);
    this.rebuild();
}

function rebuild_noawait<Func extends (...args: any) => void>(this: TaskCollection<Func>) {
    if (this.length === 0) this.call = EMPTY_FUNC;
    else this.call = bakeCollection(this._tasks, this.argsNum);
}

function rebuild_await<Func extends (...args: any) => void>(this: TaskCollection<Func>) {
    if (this.length === 0) this.call = EMPTY_FUNC;
    else this.call = bakeCollectionAwait(this._tasks, this.argsNum);
}

export class TaskCollection<
    Func extends (...args: any) => void,
    AwaitTasks extends true|false = false,
> {
    constructor(
        argsNum: ArgsNum<Func>,
        autoRebuild: boolean = true,
        public readonly awaitTasks: AwaitTasks = false as AwaitTasks,
    ) {
        this.argsNum = argsNum;

        if (awaitTasks) this.rebuild = rebuild_await.bind(this);
        else this.rebuild = rebuild_noawait.bind(this);

        this.autoRebuild = autoRebuild;
    }

    _tasks: Func[] = [];
    get tasks(): ReadonlyArray<Func> {
        return this._tasks;
    }

    get length() {
        return this._tasks.length;
    }

    readonly argsNum: ArgsNum<Func>;
    private _autoRebuild: boolean = false;
    get autoRebuild() { return this._autoRebuild; }

    set autoRebuild(newVal: boolean) {
        if (newVal) {
            this.push = push_rebuild.bind(this);
            this.remove = remove_rebuild.bind(this);
            this.insert = insert_rebuild.bind(this);
        } else {
            this.push = push_norebuild.bind(this);
            this.remove = remove_norebuild.bind(this);
            this.insert = insert_norebuild.bind(this);
        }
    }

    call: (args: Args<Func>) => (AwaitTasks extends true ? Promise<void> : void) = EMPTY_FUNC as any;

    rebuild: () => void;

    push: (...func: Func[]) => void;
    remove: (...func: Func[]) => void;
    insert: (index: number, ...func: Func[]) => void;

    /** this autorebuilds */
    readonly clear = () => {
        this._tasks.splice(0, this._tasks.length);
        this.rebuild();
    };
}