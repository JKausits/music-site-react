import React, { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../contexts/App.context";

const AnonymousGuard: React.FC<any> = ({ children }) => {
  const {
    authentication: { isAuthenticated },
  } = useAppContext();
  const location = useLocation();

  if (isAuthenticated())
    return <Navigate to="/" state={{ from: location }} replace />;

  return <Fragment>{children}</Fragment>;
};

export default AnonymousGuard;
