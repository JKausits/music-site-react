import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LinkProps, useLocation } from "react-router-dom";

interface Props extends Partial<LinkProps> {
  fallbackRoute: string;
}

const BackLink: React.FC<Props> = ({ fallbackRoute, children, ...props }) => {
  const state = useLocation().state as {
    prevLocation: string;
    text?: string;
  };
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<any>) => {
    console.log(navigate.length);
    e.preventDefault();
    if (state?.prevLocation != null) {
      navigate(state.prevLocation);
    } else if (navigate.length > 2) {
      navigate(-1);
    } else {
      navigate(fallbackRoute);
    }
  };

  return (
    <Link to="" {...props} onClick={handleClick}>
      {state?.text || children || "Back"}
    </Link>
  );
};

export default BackLink;
