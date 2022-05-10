import { useState } from "react";

export const useDialog = (): [
  isOpen: boolean,
  handleOpen: () => void,
  handleClose: () => void
] => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return [isOpen, handleOpen, handleClose];
};
