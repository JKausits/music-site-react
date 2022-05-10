export class HttpError extends Error {
    constructor(public messages: string[], public status: number) {
        super();
    }

    public static fromError(error: any) {
        if (error.response === undefined)
            return new HttpError(["Network Error"], 500);

        const { status, data } = error.response;

        switch (status) {
            case 404:
            case 400:
            case 401:
            case 422:
                if (data.messages) return new HttpError(data.messages, 400);
                return new HttpError(["Unknown Errors"], 500);
            case 500:
            default:
                return new HttpError(["Internal Server Error"], 500);
        }
    }
}
