import React from "react";
import { Link } from "react-router-dom";
import { LinkProps, useLocation } from "react-router-dom";
interface Props extends LinkProps {
  backText: string;
}

const AppLink: React.FC<Props> = ({ backText, children, to, ...props }) => {
  const location = useLocation();
  return (
    <Link
      {...props}
      state={{ prevLocation: location.pathname, text: backText }}
      to={{
        pathname: to as string,
      }}
    >
      {children}
    </Link>
  );
};

export default AppLink;
