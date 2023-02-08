export class Task {
    private _isDone: boolean;

    constructor() {
        this._isDone = false;
    }

    get isDone(): boolean {
        return this._isDone;
    }

    set isDone(value: boolean) {

        if (typeof value !== typeof this._isDone) {
            throw new Error("[isDone] SET METHOD => only [" + typeof this._isDone + "] type is acceptable, but the type was:" + typeof value + " with value: " + value);
        }
        this._isDone = value;
    }
}