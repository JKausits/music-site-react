import { useCallback, useState } from "react";
import { RequestStateDto } from "../dtos/RequestState.dto";

export const useRequest = <T, R>(
    request: (params: T) => Promise<R>
): [
    (params: T) => Promise<R | undefined>,
        R | undefined,
    RequestStateDto,
    () => void
] => {
    //#region State
    const [requestState, setRequestState] = useState<RequestStateDto>(
        new RequestStateDto()
    );
    const [result, setResult] = useState<R>();
    //#endregion

    const execute = useCallback(
        async (params: T) => {
            setRequestState((state) => state.toggleIsLoading());
            try {
                const result = await request(params);
                setResult(result);
                setRequestState((state) => state.toggleIsLoading());
                return result;
            } catch (error: any) {
                setRequestState((state) => state.setError(error));
                throw error;
            }
        },
        [setRequestState, setResult, request]
    );

    const clearError = useCallback(() => {
        setRequestState((state) => state.clearError());
    }, [setRequestState]);

    return [execute, result, requestState, clearError];
};
