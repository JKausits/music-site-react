import { snakeCase } from "lodash";

export abstract class QueryParametersDto {
  public toQueryString() {
    return Object.entries(this)
      .filter(([, value]) => value != null)
      .map(([key, value]) => `${QueryParametersDto.transformKey(key)}=${value}`)
      .join("&");
  }

  private static transformKey(key: string) {
    if (process.env.REACT_APP_BACKEND_LANGUAGE === "RAILS")
      return snakeCase(key);

    return key;
  }
}
