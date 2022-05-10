import { HttpError } from "./HttpError.dto";
import _ from "lodash";

export class RequestStateDto {
    isLoading: boolean = false;
    error?: HttpError;

    public toggleIsLoading() {
        const copy = this.clone();
        copy.isLoading = !this.isLoading;
        if (copy.isLoading) copy.error = undefined;

        return copy;
    }

    public setError(error: any) {
        const copy = this.clone();
        copy.isLoading = false;
        copy.error = HttpError.fromError(error);
        return copy;
    }

    public clearError() {
        const copy = this.clone();
        copy.error = undefined;
        return copy;
    }

    public clone() {
        return _.cloneDeep(this) as RequestStateDto;
    }
}
