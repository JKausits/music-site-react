import React, { Fragment } from "react";
import { RequestStateDto } from "../../dtos/RequestState.dto";
import { Alert } from "react-bootstrap";

interface Props {
  requestState: RequestStateDto;
}

const RequestAlert: React.FC<Props> = ({ requestState }) => {
  if (requestState.error == null) return <Fragment></Fragment>;

  return (
    <Alert variant="danger">
      <ul className={"m-0"}>
        {requestState.error.messages.map((msg, index) => (
          <li key={`error-${index}`}>{msg}</li>
        ))}
      </ul>
    </Alert>
  );
};

export default RequestAlert;
