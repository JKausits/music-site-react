import React, { useEffect } from "react";
import {
  VenueRequestDto,
  VenueDto,
  VenueDetailDto,
} from "../../../app/dtos/Venues.dto";
import { Button, Form, Modal } from "react-bootstrap";
import ControlledInput from "../../../app/components/controlled-inputs/ControlledInput";
import LoadingButton from "../../../app/components/buttons/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
interface Props {
  isOpen: boolean;
  venue?: VenueDto | VenueDetailDto;
  onClose(): void;
  onSubmit(dto: VenueRequestDto): Promise<any>;
}

const VenueFormDialog: React.FC<Props> = ({
  isOpen,
  venue,
  onClose,
  onSubmit,
}) => {
  //#region State
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: new VenueRequestDto(venue),
    resolver: yupResolver(VenueRequestDto.getSchema()),
    mode: "all",
  });
  //#endregion

  //#region Handlers
  const handleOnSubmit = handleSubmit(async (dto: VenueRequestDto) => {
    await onSubmit(dto);
    if (venue == null) reset(new VenueRequestDto());
  });

  const handleClose = () => {
    reset(new VenueRequestDto(venue));
    onClose();
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    reset(new VenueRequestDto(venue));
  }, [venue, reset]);
  //#endregion

  return (
    <Modal
      show={isOpen}
      header={`${venue ? "Update" : "Create"} Venue`}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>{venue ? "Update" : "Create"} Venue</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
        <Modal.Body>
          <ControlledInput name="name" label="Name" control={control} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            disabled={isSubmitting}
            variant="secondary"
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            variant="primary"
          >
            Submit
          </LoadingButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default VenueFormDialog;
