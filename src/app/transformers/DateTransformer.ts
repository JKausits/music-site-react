import { isArray } from "lodash";

export class DateTransformer {
    private static isoDateFormat =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
    private static isIsoDateString(value: any): boolean {
        return (
            value &&
            typeof value === "string" &&
            DateTransformer.isoDateFormat.test(value)
        );
    }

    public static fromResponseBody(body: any) {
        if (
            body === null ||
            body === undefined ||
            (typeof body !== "object" && !isArray(body))
        )
            return body;

        if (isArray(body)) body.forEach(DateTransformer.fromResponseBody);
        else if (typeof body === "object")
            for (const key of Object.keys(body)) {
                const value = body[key];
                if (DateTransformer.isIsoDateString(value)) body[key] = new Date(value);
                else if (typeof value === "object")
                    DateTransformer.fromResponseBody(value);
            }
    }
}
