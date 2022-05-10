import React from "react";
import { OverlayTrigger, OverlayTriggerProps, Tooltip } from "react-bootstrap";

interface Props extends Partial<OverlayTriggerProps> {
  tooltip: React.ReactNode;
}

const OverlayTooltip: React.FC<React.PropsWithChildren<Props>> = ({
  tooltip,
  children,
  ...props
}) => {
  return (
    <OverlayTrigger {...props} overlay={<Tooltip>{tooltip}</Tooltip>}>
      <span>{children}</span>
    </OverlayTrigger>
  );
};

export default OverlayTooltip;
