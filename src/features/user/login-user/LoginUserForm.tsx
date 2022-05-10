import React from "react";
import { UserLoginRequestDto } from "../../../app/dtos/Users.dto";
import { useFormik } from "formik";
import { Card, Col, Form, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import ControlledInput from "../../../app/components/controlled-inputs/ControlledInput";
import LoadingButton from "../../../app/components/buttons/LoadingButton";

interface Props {
  onSubmit(dto: UserLoginRequestDto): Promise<void>;
}

const LoginUserForm: React.FC<Props> = ({ onSubmit }) => {
  //#region State
  const formik = useFormik({
    initialValues: new UserLoginRequestDto(),
    validationSchema: UserLoginRequestDto.getSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit,
  });
  //#endregion

  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Row className="mb-3">
            <ControlledInput
              groupProps={{ as: Col, className: "col-md-12" }}
              formik={formik}
              label={"Email"}
              name={"email"}
            />
            <ControlledInput
              groupProps={{ as: Col, className: "col-md-12" }}
              formik={formik}
              label={"Password"}
              name={"password"}
              controlProps={{ type: "password" }}
            />
            <Col md={12} className="d-grid mt-3">
              <LoadingButton
                isLoading={formik.isSubmitting}
                type="submit"
                variant="primary"
              >
                Login
              </LoadingButton>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginUserForm;
