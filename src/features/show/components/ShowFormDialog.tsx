import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormikHelpers, useFormik } from "formik";
import ControlledInput from "../../../app/components/controlled-inputs/ControlledInput";
import LoadingButton from "../../../app/components/buttons/LoadingButton";
import { ShowDto, ShowRequestDto } from "../../../app/dtos/Shows.dto";
import ControlledCurrencyInput from "../../../app/components/controlled-inputs/ControlledCurrencyInput";
import { RequestStateDto } from "../../../app/dtos/RequestState.dto";
import RequestAlert from "../../../app/components/alerts/RequestAlert";
interface Props {
  isOpen: boolean;
  show?: ShowDto;
  requestState: RequestStateDto;
  onClose(): void;
  onSubmit(dto: ShowRequestDto): Promise<any>;
}

const ShowFormDialog: React.FC<Props> = ({
  isOpen,
  show,
  requestState,
  onClose,
  onSubmit,
}) => {
  //#region State
  const formik = useFormik({
    initialValues: new ShowRequestDto(show),
    validationSchema: ShowRequestDto.getSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values: ShowRequestDto, props: FormikHelpers<any>) => {
      await onSubmit(values);
      if (show == null) props.resetForm({ values: new ShowRequestDto() });
    },
  });
  const { resetForm } = formik;
  //#endregion

  //#region Handlers
  const handleClose = () => {
    resetForm({ values: new ShowRequestDto(show) });
    onClose();
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    resetForm({ values: new ShowRequestDto(show) });
  }, [show, resetForm]);
  //#endregion

  return (
    <Modal
      show={isOpen}
      header={`${show ? "Update" : "Create"} Show`}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>{show ? "Update" : "Create"} Show</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <RequestAlert requestState={requestState} />
        <Modal.Body>
          <ControlledInput name="name" label="Name" formik={formik} />
          <ControlledInput
            name="startAt"
            label="Start At"
            controlProps={{ type: "datetime-local" }}
            formik={formik}
          />
          <ControlledInput
            name="endAt"
            label="End At"
            controlProps={{ type: "datetime-local" }}
            formik={formik}
          />
          <ControlledCurrencyInput name="rate" label="Price" formik={formik} />
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

export default ShowFormDialog;
