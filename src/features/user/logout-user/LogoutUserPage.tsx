import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../app/contexts/App.context";

const LogoutUserPage = () => {
  const {
    authentication: { handleLogout },
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
    navigate("/login");
  }, [handleLogout, navigate]);

  return <div></div>;
};

export default LogoutUserPage;
