import { useAppContext } from "../../../app/contexts/App.context";
import { RequestStateDto } from "../../../app/dtos/RequestState.dto";
import { UserLoginRequestDto } from "../../../app/dtos/Users.dto";
import { useLoginUser } from "../../../app/hooks/requestHooks";

export interface UserLoginPageProps {
  state: {
    loginUserRequestState: RequestStateDto;
  };
  handlers: {
    handleLoginUser(dto: UserLoginRequestDto): Promise<void>;
  };
}

export const useUserLoginPage = (): UserLoginPageProps => {
  //#region State
  const {
    notification: { sendSuccessNotification },
  } = useAppContext();
  const {
    authentication: { handleLogin },
  } = useAppContext();
  //#endregion

  //#region Requests
  const [loginUser, , loginUserRequestState] = useLoginUser();
  //#endregion

  //#region Handlers
  const handleLoginUser = async (dto: UserLoginRequestDto) => {
    const result = await loginUser(dto);
    if (result) {
      handleLogin(result.token);
      sendSuccessNotification("Welcome!", "");
    }
  };
  //#endregion
  return {
    state: { loginUserRequestState },
    handlers: { handleLoginUser },
  };
};
