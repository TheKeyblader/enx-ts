import { IReactionDisposer } from "mobx";

export class Disposable {
    private isDisposed: boolean;
    private readonly disposers: (IReactionDisposer | Disposable)[];

    constructor() {
        this.isDisposed = false;
        this.disposers = [];
    }

    addDisposer<T extends IReactionDisposer | Disposable>(disposer: T) {
        this.disposers.push(disposer);
        return disposer;
    }

    dispose() {
        if (this.isDisposed) throw new Error("This class instace is already disposed!");
        for (let disposer of this.disposers) {
            if (disposer instanceof Disposable) disposer.dispose();
            else disposer();
        }
        this.isDisposed = true;
    }
}
