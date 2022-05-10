import { ShowDto } from "./Shows.dto";
import { PaginationQueryParametersDto } from "./PaginationQueryParameters.dto";
import * as Yup from "yup";

export class VenueDto {
    id: string = "";
    name: string = "";
}

export class VenueDetailDto {
    id: string = "";
    name: string = "";
    shows: ShowDto[] = [];
}

export class VenueRequestDto {
    name: string = "";

    constructor(venue?: VenueDto | VenueDetailDto) {
        if (venue) this.name = venue.name;
    }

    public static getSchema() {
        return Yup.object().shape({
            name: Yup.string().label("Name").required().max(255),
        });
    }
}

export class VenueQueryParametersDto extends PaginationQueryParametersDto {}
