import { PaginatedListDto } from "../dtos/PaginatedList.dto";
import { ShowRequestDto, ShowDto } from "../dtos/Shows.dto";
import {
    VenueDto,
    VenueDetailDto,
    VenueQueryParametersDto,
    VenueRequestDto,
} from "../dtos/Venues.dto";
import { agent } from "./Agent";

interface UpdateVenueRequestParams {
    id: string;
    dto: VenueRequestDto;
}

interface CreateShowRequestParams {
    id: string;
    dto: ShowRequestDto;
}

const createVenue = (dto: VenueRequestDto) =>
    agent.postRequest<VenueDto>("venues", dto);

const getVenues = (queryParams: VenueQueryParametersDto) =>
    agent.getRequest<PaginatedListDto<VenueDto>>(
        `venues?${queryParams.toQueryString()}`
    );

const getVenue = (id: string) =>
    agent.getRequest<VenueDetailDto>(`venues/${id}`);

const deleteVenue = (id: string) => agent.deleteRequest(`venues/${id}`);

const updateVenue = ({ id, dto }: UpdateVenueRequestParams) =>
    agent.putRequest<VenueDto>(`venues/${id}`, dto);

const createShow = ({ id, dto }: CreateShowRequestParams) =>
    agent.postRequest<ShowDto>(`venues/${id}/shows`, dto);

const VenueRequests = {
    createVenue,
    getVenues,
    getVenue,
    updateVenue,
    deleteVenue,
    createShow,
};

export default VenueRequests;
