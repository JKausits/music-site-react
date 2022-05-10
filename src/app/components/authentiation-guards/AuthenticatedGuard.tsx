import React, { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../contexts/App.context";

const AuthenticatedGuard: React.FC<any> = ({ children }) => {
  const {
    authentication: { isAuthenticated, isInitialized },
  } = useAppContext();
  const location = useLocation();

  if (!isInitialized) return <Fragment></Fragment>;

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, error: "You are not currently logged in." }}
        replace
      />
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthenticatedGuard;
