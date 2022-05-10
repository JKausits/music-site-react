import React from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

interface Props extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: React.FC<Props> = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props} disabled={isLoading}>
      <div className="position-relative">
        {children}{" "}
        {isLoading && (
          <div className="position-absolute end-0 top-50 translate-middle">
            <Spinner animation="border" size={"sm"} />
          </div>
        )}
      </div>
    </Button>
  );
};

export default LoadingButton;
