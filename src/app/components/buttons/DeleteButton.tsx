import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import TooltipButton from "./TooltipButton";

interface Props extends ButtonProps {
  tooltip?: React.ReactNode;
}

const DeleteButton: React.FC<Props> = ({ children, tooltip, ...props }) => {
  const button = (
    <Button
      {...props}
      variant={"outline-danger"}
      className={`${props.className} border-white-50`}
    >
      <i className="bi bi-trash"></i>
      {children}
    </Button>
  );

  if (tooltip != null)
    return <TooltipButton tooltip={tooltip}>{button}</TooltipButton>;

  return button;
};

export default DeleteButton;
