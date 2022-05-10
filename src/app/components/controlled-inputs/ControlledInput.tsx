import React from "react";
import {
  Form,
  FormControlProps,
  FormGroupProps,
  FormLabelProps,
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

const ControlledInput: React.FC<Props> = ({
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
        return (
          <Form.Group {...groupProps}>
            <Form.Label htmlFor={name} {...labelProps}>
              {label}
            </Form.Label>
            <Form.Control
              {...controlProps}
              id={name}
              {...field}
              disabled={formState.isSubmitting}
              isInvalid={
                (fieldState.isTouched || formState.submitCount > 0) &&
                !!fieldState.error
              }
            />
            <Form.Control.Feedback type="invalid">
              {fieldState.error?.message}
            </Form.Control.Feedback>
          </Form.Group>
        );
      }}
    />
  );
};

export default ControlledInput;
