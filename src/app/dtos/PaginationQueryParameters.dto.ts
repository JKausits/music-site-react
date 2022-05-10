import { QueryParametersDto } from "./QueryParameters.dto";
import { cloneDeep } from "lodash";

export class PaginationQueryParametersDto extends QueryParametersDto {
  page: number = 0;
  pageSize: number = 10;
  public paginate(page: number, pageSize: number) {
    const copy = this.clone();
    copy.page = page;
    copy.pageSize = pageSize;

    return copy;
  }

  private clone() {
    return cloneDeep(this);
  }
}
