import React, { Fragment, useRef } from "react";
import { Button, Overlay, OverlayProps, Popover } from "react-bootstrap";
import { useDialog } from "../hooks/useDialog";

interface Props extends Partial<OverlayProps> {
  text: string;
  onConfirm(): void;
}

const OverlayConfirmDelete: React.FC<React.PropsWithChildren<Props>> = ({
  text,
  onConfirm,
  children,
  ...props
}) => {
  const [isOpen, handleOpen, handleClose] = useDialog();
  let target = useRef<any>(null);

  const popover = (
    <Overlay target={target.current} {...props} show={isOpen}>
      <Popover>
        <Popover.Header>Confirm Delete</Popover.Header>
        <Popover.Body>
          <div className="d-flex align-items-center p-2">
            <i className="bi bi-exclamation-circle text-danger fs-2 me-2"></i>
            {text}
          </div>
          <div className="d-flex justify-content-end mt-1">
            <Button
              className="me-1"
              variant="outline-secondary"
              size={"sm"}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="outline-danger" size={"sm"} onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </Popover.Body>
      </Popover>
    </Overlay>
  );

  return (
    <Fragment>
      <span ref={target} onClick={handleOpen}>
        {children}
      </span>
      {popover}
    </Fragment>
  );
};

export default OverlayConfirmDelete;
