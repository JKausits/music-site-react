import React, { Fragment } from "react";
import { isArray, isString } from "lodash";
import { FormikErrors } from "formik";

interface Props {
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
}

const ControlledErrors: React.FC<Props> = ({ errors }) => {
  if (errors == null) return <Fragment></Fragment>;

  if (isString(errors)) return <Fragment>{errors}</Fragment>;
  if (isArray(errors))
    return (
      <div>
        {errors.map((error) => (
          <div key={error.toString()}>{error.toString()}</div>
        ))}
      </div>
    );

  return <Fragment>{errors.toString()}</Fragment>;
};

export default ControlledErrors;
