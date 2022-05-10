import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import TooltipButton from "./TooltipButton";

interface Props extends ButtonProps {
  tooltip?: React.ReactNode;
}

const AddButton: React.FC<Props> = ({ children, tooltip, ...props }) => {
  const button = (
    <Button
      {...props}
      variant={"outline-success"}
      className={`${props.className} border-white-50`}
    >
      <div className="d-flex align-items-center">
        <i className="bi bi-plus "></i>
        {children}
      </div>
    </Button>
  );

  if (tooltip != null)
    return <TooltipButton tooltip={tooltip}>{button}</TooltipButton>;

  return button;
};

export default AddButton;
