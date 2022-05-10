import React from "react";
import OverlayTooltip from "../OverlayTooltip";

interface Props {
  tooltip: React.ReactNode;
}

const TooltipButton: React.FC<React.PropsWithChildren<Props>> = ({
  tooltip,
  children,
}) => {
  return (
    <OverlayTooltip tooltip={tooltip} placement="left">
      <span>{children}</span>
    </OverlayTooltip>
  );
};

export default TooltipButton;
