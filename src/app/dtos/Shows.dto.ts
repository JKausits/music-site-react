import { cloneDeep } from "lodash";
import * as Yup from "yup";
import { QueryParametersDto } from "./QueryParameters.dto";
import { VenueDto } from "./Venues.dto";
import { ValueFormatter } from "../formatters/Value.formatter";

export class ShowDto {
  id: string = "";
  name: string = "";
  startAt: Date = new Date();
  endAt: Date = new Date();
  rate: number = 0;
}

export class ShowRequestDto {
  name: string = "";
  startAt: string = ValueFormatter.formDateTimeFormString(new Date());
  endAt: string = ValueFormatter.formDateTimeFormString(new Date());
  rate: number = 0;

  constructor(show?: ShowDto) {
    if (show) {
      this.name = show.name;
      this.startAt = ValueFormatter.formDateTimeFormString(show.startAt);
      this.endAt = ValueFormatter.formDateTimeFormString(show.endAt);
      this.rate = show.rate;
    }
  }

  public static getSchema() {
    return Yup.object().shape({
      name: Yup.string().label("Event Name").required().max(255),
      startAt: Yup.date()
        .label("Start At")
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .required(),
      endAt: Yup.date()
        .label("End At")
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .required()
        .when(
          "startAt",
          (startAt, yup) =>
            startAt != null &&
            yup.min(startAt, "End At cannot be before Started At.")
        ),
      rate: Yup.number()
        .label("Price")
        .typeError("Price must be a valid number")
        .required()
        .min(0),
    });
  }
}

export class ShowsQueryParameters extends QueryParametersDto {
  startDate?: Date | string;
  endDate?: Date | string;

  constructor({ startDate, endDate }: { startDate?: Date; endDate?: Date }) {
    super();
    this.startDate = startDate?.toLocaleDateString();
    this.endDate = endDate?.toLocaleDateString();
  }

  public setDateRanges(startDate?: Date, endDate?: Date) {
    const copy = this.clone();
    copy.startDate = startDate?.toLocaleDateString();
    copy.endDate = endDate?.toLocaleDateString();
    return copy;
  }

  private clone() {
    return cloneDeep(this);
  }
}
export class ShowListDto {
  id: string = "";
  name: string = "";
  startAt: Date = new Date();
  endAt: Date = new Date();
  venue: VenueDto = new VenueDto();
}
