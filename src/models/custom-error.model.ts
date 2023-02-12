export class CustomError extends Error {
    private _statusCode!: number
    private _userMessage!: string
    private _developerMessage!: string

    constructor(status: number, userMessage: string, developerMessage: string) {
        super(userMessage)
        this._statusCode = status
        this._userMessage = userMessage
        this._developerMessage = developerMessage
    }

    get status(): number {
        return this._statusCode;
    }

    set status(value: number) {

        if (typeof value !== typeof this._statusCode) {
            throw new Error("CustomException [status] SET METHOD => only [" + typeof this._statusCode + "] type is acceptable, but the type was:" + typeof value + " with value: " + value);
        }
        this._statusCode = value;
    }

    get userMessage(): string {
        return this._userMessage;
    }

    set userMessage(value: string) {

        if (typeof value !== typeof this._userMessage) {
            throw new Error("CustomException [userMessage] SET METHOD => only [" + typeof this._userMessage + "] type is acceptable, but the type was:" + typeof value + " with value: " + value);
        }
        this._userMessage = value;
    }

    get developerMessage(): string {
        return this._developerMessage;
    }

    set developerMessage(value: string) {

        if (typeof value !== typeof this._developerMessage) {
            throw new Error("CustomException [developerMessage] SET METHOD => only [" + typeof this._developerMessage + "] type is acceptable, but the type was:" + typeof value + " with value: " + value);
        }
        this._developerMessage = value;
    }
}