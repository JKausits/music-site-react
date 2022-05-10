import React from "react";
import {
  Form,
  FormControlProps,
  FormGroupProps,
  FormLabelProps,
  InputGroup,
} from "react-bootstrap";
import { Control, Controller } from "react-hook-form";

interface Props extends FormControlProps {
  control: Control<any>;
  label: React.ReactNode;
  name: string;
  controlProps?: FormControlProps;
  groupProps?: FormGroupProps;
  labelProps?: FormLabelProps;
}

const ControlledCurrencyInput: React.FC<Props> = ({
  control,
  label,
  name,
  controlProps = {},
  groupProps = {},
  labelProps = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const { onChange } = field;
        return (
          <Form.Group {...groupProps}>
            <Form.Label htmlFor={name} {...labelProps}>
              {label}
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                style={{ textAlign: "right" }}
                {...controlProps}
                {...field}
                id={name}
                name={name}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  const { value } = e.currentTarget;
                  if (value === "" || re.test(value)) onChange(e);
                }}
                disabled={formState.isSubmitting}
                isInvalid={
                  (fieldState.isTouched || formState.submitCount > 0) &&
                  !!fieldState.error
                }
              />
              <InputGroup.Text>.00</InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {fieldState.error?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
    />
  );
};

export default ControlledCurrencyInput;
