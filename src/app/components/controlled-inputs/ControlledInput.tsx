import React from "react";
import {
  Form,
  FormControlProps,
  FormGroupProps,
  FormLabelProps,
} from "react-bootstrap";
import { FormikProps } from "formik";
import ControlledErrors from "./ControlledErrors";

interface Props extends FormControlProps {
  formik: FormikProps<any>;
  label: React.ReactNode;
  name: string;
  controlProps?: FormControlProps;
  groupProps?: FormGroupProps;
  labelProps?: FormLabelProps;
}

const ControlledInput: React.FC<Props> = ({
  formik,
  label,
  name,
  controlProps = {},
  groupProps = {},
  labelProps = {},
}) => {
  const { handleChange, handleBlur, touched, errors, values, submitCount } =
    formik;

  return (
    <Form.Group {...groupProps}>
      <Form.Label htmlFor={name} {...labelProps}>
        {label}
      </Form.Label>
      <Form.Control
        {...controlProps}
        id={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={(touched[name] || submitCount > 0) && !!errors[name]}
      />
      <Form.Control.Feedback type="invalid">
        <ControlledErrors errors={errors[name]} />
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ControlledInput;
