// DEPENDANT

export declare namespace Dependant {
    type Promise = globalThis.Promise<any | void>;
    type Codename = PropertyKey;
    type Object = Record<Codename, Promise>;
    interface Event extends globalThis.Event {

    }
}

class DependantEvent extends Event {
    public instance: Dependant;
    public codename: Dependant.Codename;
    constructor(type: "dependantadded" | "dependantsettled", codename: Dependant.Codename, instance: Dependant) { // TODO: Add before Events
        super(type, { bubbles: false, cancelable: false, composed: false });
        this.instance = instance;
        this.codename = codename;
    }
}

class DependantSettledEvent extends DependantEvent {
    public rejected: boolean;
    public result: any;
    constructor(codename: Dependant.Codename, instance: Dependant, rejected: boolean, result: any) { // I trust that whoever calls this doesn't lie about the result
        super("dependantsettled", codename, instance);
        this.rejected = rejected;
        this.result = result;
    }
}

class DependantAddedEvent extends DependantEvent {
    public promise: Dependant.Promise;
    public codename: Dependant.Codename;
    constructor(codename: Dependant.Codename, instance: Dependant) {
        instance.ErrorIfUnknownCodename(codename);
        super("dependantsettled", codename, instance);
        this.promise = instance.promises[codename] as Dependant.Promise;
        this.codename = codename;
    }
}

/** systemd init dependency structurer, implemented as if it were dbus, for the web */
export class Dependant {
    // BASICS

    /** Internal promises: Can actually be modified */
    protected _promises: Record<PropertyKey, Dependant.Promise> = {}
    /** Object containing the Promises (read-only) */
    public get promises() {
        return this._promises;
    }
    /** Object containing the functions for resolving or rejecting the promises */
    protected promiseFunctions: Record<PropertyKey, { resolve: (value: unknown) => void, reject: (reason?: any) => void }> = {};

    public eventTarget: EventTarget = new EventTarget();
    public readonly publicEvents: boolean;

    /**
     * Create a ReferenceError with Codename as a subject. Used when Codename doesn't exist.
     * @param codename 
     * @returns 
     */
    public CodenameError(codename: Dependant.Codename): ReferenceError {
        const err = new ReferenceError(`Codename ${codename.toString()} doesn't exist on this instance.`);
        err.name = "CodenameError"
        err.cause = { instance: this, codename: codename };
        return err;
    }
    /**
     * Check for Codename, and if it doesn't exist, throw `ReferenceError` with name `CodenameError`.
     * @param codename 
     */
    public ErrorIfUnknownCodename(codename: Dependant.Codename): void {
        if (!this.exists(codename)) throw this.CodenameError(codename);
    }
    /**
     * Check if a codename is a valid codename
     * @param codename 
     * @returns 
     */
    public isCodename(codename: any) {
        switch (typeof codename) {
            case "string":
            case "symbol":
            case "number":
                return true;
        
            default:
                return false;
        }
    }

    /**
     * Dispatch a `DependantEvent`. Takes care of where to dispatch it.
     * @param event instance of `DependantEvent` or extended from it
     */
    protected dispatchEvent(event: DependantEvent) {
        this.eventTarget.dispatchEvent(event);
        if (this.publicEvents === true) window.dispatchEvent(event);
    }

    // CONSTRUCTOR

    /**
     * Create a new dependency tree. 
     * @param codenames One or more codenames to create on init
     * @param publicEvent if the state change of a Promise should be broadcast on `window` alongside the instance.
     */
    constructor(codenames: [Dependant.Codename | Dependant, ...Array<Dependant.Codename | Dependant>], publicEvents: boolean = false) {
        const realCodenames: Dependant.Codename[] = []
        const realDependants: Dependant[] = []
        codenames.map((codename) => {
            if (this.isCodename(codename)) {
                realCodenames.push(codename as Dependant.Codename);
            } else if (codename instanceof Dependant) {
                realDependants.push(codename);
            }
        });
        
        // CODENAMES
        this.add(...realCodenames); // do it one big swoop

        // DEPENDANTS
        const expandedDependants: Dependant.Promise[] = realDependants.flatMap((dep) => dep.all);
        expandedDependants.map((prom) => {
            this._add(Symbol("Other Dependant"), prom); // add to symbol, so it's essentially unremovable
        })

        // EVENTS
        this.publicEvents = publicEvents;
    }

    // GET & CHECK

    /** Array of all promises registered to instance */
    public get all(): Dependant.Promise[] {
        return Object.values(this.promises);
    }
    /**
     * Check if a codename exists
     * @param codename 
     */
    public exists(codename: Dependant.Codename): boolean {
        return (this.promises[codename] !== undefined);
    }
    /**
     * Get array of Promises from codenames. Undefined codenames are silently ignored. Useful for chaining like:
     * ```ts
     * await Promise.all(instance.await("wait1", "wait2"))
     * ```
     * @param codenames 
     * @returns 
     */
    public await(...codenames: Dependant.Codename[]): Dependant.Promise[] {
        return codenames.map((codename) => {
            this.ErrorIfUnknownCodename(codename); // If codename doesn't exist, exit.
            return this.promises[codename];
        }).filter((val) => val !== undefined);
    }

    // ADD, RESOLVE, REJECT

    /**
     * Internal function that adds the promise with a given objectKey to the promises.
     * 
     * **WARNING:** Silently rejects on found duplicate.
     * @param objectKey 
     * @param promise 
     */
    protected _add(objectKey: PropertyKey, promise: Dependant.Promise, overwrite: boolean = false): void {
        if (!overwrite && this.exists(objectKey)) return;
        this._promises[objectKey] = promise;
    }
    /**
     * Adds new dependencies to the instance. Duplicates are silently ignored.
     * @param codenames 
     * @returns Object with the codenames associated to their solvers. Can be used in conjunction with `Dependant.await`.
     */
    public add(...codenames: Dependant.Codename[]): void {
        // deduplicate
        if (codenames.length > 1) {
            let codenamesDeduplicated: Set<Dependant.Codename> = new Set();
            codenames.map(codename => codenamesDeduplicated.add(codename));
            codenames = Array.from(codenamesDeduplicated);
        }
        // create promise
        const codenamesToPromises: { codename: Dependant.Codename, promise: Dependant.Promise }[] = codenames.map((codename) => ({codename: codename, promise: new Promise((resolve, reject) => {
            this.promiseFunctions[codename] = {
                resolve: resolve,
                reject: reject
            }
        })}));
        codenamesToPromises.map((entry) => {
            // Add into system
            this._add(entry.codename, entry.promise);
            this.dispatchEvent(new DependantAddedEvent(entry.codename, this));
        });
    }
    public resolve(codename: Dependant.Codename, value?: any) {
        return this.resolve_or_reject(codename, value, false);
    }
    public reject(codename: Dependant.Codename, reason?: any) {
        return this.resolve_or_reject(codename, reason, true);
    }
    private resolve_or_reject(codename: Dependant.Codename, result: any,  rejected: boolean = false) {
        this.ErrorIfUnknownCodename(codename);
        const promise_call = rejected ? this.promiseFunctions[codename]!.reject : this.promiseFunctions[codename]!.resolve;
        promise_call(result);
        this.dispatchEvent(new DependantSettledEvent(codename, this, rejected, result));
    }
}
