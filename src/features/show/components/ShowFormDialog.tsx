import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ControlledInput from "../../../app/components/controlled-inputs/ControlledInput";
import LoadingButton from "../../../app/components/buttons/LoadingButton";
import { ShowDto, ShowRequestDto } from "../../../app/dtos/Shows.dto";
import ControlledCurrencyInput from "../../../app/components/controlled-inputs/ControlledCurrencyInput";
import { RequestStateDto } from "../../../app/dtos/RequestState.dto";
import RequestAlert from "../../../app/components/alerts/RequestAlert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const {
    control,
    reset,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: new ShowRequestDto(show),
    resolver: yupResolver(ShowRequestDto.getSchema()),
    mode: "all",
  });
  //#endregion
  // console.log(values);
  //#region Handlers
  const handleOnSubmit = handleSubmit(async (dto: ShowRequestDto) => {
    await onSubmit(dto);
    if (show == null) reset(new ShowRequestDto());
  });

  const handleClose = () => {
    reset(new ShowRequestDto(show));
    onClose();
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    reset(new ShowRequestDto(show));
  }, [show, reset]);
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
      <Form onSubmit={handleOnSubmit}>
        <RequestAlert requestState={requestState} />
        <Modal.Body>
          <ControlledInput name="name" label="Name" control={control} />
          <ControlledInput
            name="startAt"
            label="Start At"
            controlProps={{ type: "datetime-local" }}
            control={control}
          />
          <ControlledInput
            name="endAt"
            label="End At"
            controlProps={{ type: "datetime-local" }}
            control={control}
          />
          <ControlledCurrencyInput
            name="rate"
            label="Price"
            control={control}
          />
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

export default ShowFormDialog;
