import React, { useEffect } from "react";
import {
  VenueRequestDto,
  VenueDto,
  VenueDetailDto,
} from "../../../app/dtos/Venues.dto";
import { Button, Form, Modal } from "react-bootstrap";
import { FormikHelpers, useFormik } from "formik";
import ControlledInput from "../../../app/components/controlled-inputs/ControlledInput";
import LoadingButton from "../../../app/components/buttons/LoadingButton";
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
  const formik = useFormik({
    initialValues: new VenueRequestDto(venue),
    validationSchema: VenueRequestDto.getSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values: VenueRequestDto, props: FormikHelpers<any>) => {
      await onSubmit(values);
      if (venue == null) props.resetForm({ values: new VenueRequestDto() });
    },
  });
  const { resetForm } = formik;
  //#endregion

  //#region Handlers
  const handleClose = () => {
    resetForm({ values: new VenueRequestDto(venue) });
    onClose();
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    resetForm({ values: new VenueRequestDto(venue) });
  }, [venue, resetForm]);
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
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <ControlledInput name="name" label="Name" formik={formik} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            disabled={formik.isSubmitting}
            variant="secondary"
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            isLoading={formik.isSubmitting}
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
