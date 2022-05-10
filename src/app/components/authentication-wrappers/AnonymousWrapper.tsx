import React, { Fragment } from "react";
import { useAppContext } from "../../contexts/App.context";

const AnonymousWrapper: React.FC<any> = ({ children }) => {
  const {
    authentication: { isAuthenticated },
  } = useAppContext();

  if (!isAuthenticated()) return <Fragment>{children}</Fragment>;

  return <Fragment></Fragment>;
};

export default AnonymousWrapper;
