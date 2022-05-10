import { isArray } from "lodash";

export class FormErrorFormatter {
  public static formErrors(errors: string | string[]) {
    if (isArray(errors)) return errors.join("");
  }
}
