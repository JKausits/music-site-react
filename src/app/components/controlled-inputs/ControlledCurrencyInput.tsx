import React from "react";
import {
  Form,
  FormControlProps,
  FormGroupProps,
  FormLabelProps,
  InputGroup,
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

const ControlledCurrencyInput: React.FC<Props> = ({
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
      <InputGroup>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          style={{ textAlign: "right" }}
          {...controlProps}
          id={name}
          value={values[name]}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            const { value } = e.currentTarget;

            if (value === "" || re.test(value)) handleChange(e);
          }}
          onBlur={handleBlur}
          isInvalid={(touched[name] || submitCount > 0) && !!errors[name]}
        />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
      <Form.Control.Feedback type="invalid">
        <ControlledErrors errors={errors[name]} />
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ControlledCurrencyInput;
