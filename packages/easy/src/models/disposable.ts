import { IReactionDisposer } from "mobx";

export class Disposable {
    private _isDisposed: boolean;
    private readonly disposers: (IReactionDisposer | Disposable)[];

    get isDisposed() {
        return this._isDisposed;
    }

    constructor() {
        this._isDisposed = false;
        this.disposers = [];
    }

    addDisposer<T extends IReactionDisposer | Disposable>(disposer: T) {
        this.disposers.push(disposer);
        return disposer;
    }

    dispose() {
        if (this._isDisposed) throw new Error("This class instance is already disposed!");
        this._isDisposed = true;
        for (let disposer of this.disposers) {
            if (disposer instanceof Disposable) {
                if (!disposer.isDisposed) disposer.dispose();
            } else disposer();
        }
    }
}
