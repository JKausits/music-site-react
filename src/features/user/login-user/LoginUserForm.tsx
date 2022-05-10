import React from "react";
import { UserLoginRequestDto } from "../../../app/dtos/Users.dto";
import { Card, Col, Form, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import ControlledInput from "../../../app/components/controlled-inputs/ControlledInput";
import LoadingButton from "../../../app/components/buttons/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  onSubmit(dto: UserLoginRequestDto): Promise<void>;
}

const LoginUserForm: React.FC<Props> = ({ onSubmit }) => {
  //#region State
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: new UserLoginRequestDto(),
    resolver: yupResolver(UserLoginRequestDto.getSchema()),
    mode: "all",
  });
  //#endregion

  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="mb-3">
            <ControlledInput
              groupProps={{ as: Col, className: "col-md-12" }}
              control={control}
              label={"Email"}
              name={"email"}
            />
            <ControlledInput
              groupProps={{ as: Col, className: "col-md-12" }}
              control={control}
              label={"Password"}
              name={"password"}
              controlProps={{ type: "password" }}
            />
            <Col md={12} className="d-grid mt-3">
              <LoadingButton
                isLoading={isSubmitting}
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
