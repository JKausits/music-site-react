import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import TooltipButton from "./TooltipButton";

interface Props extends ButtonProps {
  tooltip?: React.ReactNode;
}

const EditButton: React.FC<Props> = ({ children, tooltip, ...props }) => {
  const button = (
    <Button
      {...props}
      style={{ color: "rgba(255, 255, 255, 0.85)" }}
      variant={"outline-secondary"}
      className={`${props.className} border-white-50`}
    >
      <i className="bi bi-pencil-square"></i>
      {children}
    </Button>
  );

  if (tooltip != null)
    return <TooltipButton tooltip={tooltip}>{button}</TooltipButton>;

  return button;
};

export default EditButton;
