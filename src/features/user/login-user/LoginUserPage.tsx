import React from "react";
import LoginUserForm from "./LoginUserForm";
import { useUserLoginPage } from "./useLoginUserPage";
import RequestAlert from "../../../app/components/alerts/RequestAlert";

const LoginUserPage = () => {
  const {
    state: { loginUserRequestState },
    handlers: { handleLoginUser },
  } = useUserLoginPage();

  return (
    <div>
      <RequestAlert requestState={loginUserRequestState} />
      <LoginUserForm onSubmit={handleLoginUser} />
    </div>
  );
};

export default LoginUserPage;
