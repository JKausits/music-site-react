import {
    ShowDto,
    ShowListDto,
    ShowRequestDto,
    ShowsQueryParameters,
} from "../dtos/Shows.dto";
import { agent } from "./Agent";

interface UpdateShowRequestParams {
    id: string;
    dto: ShowRequestDto;
}

const updateShow = ({ id, dto }: UpdateShowRequestParams) =>
    agent.putRequest<ShowDto>(`shows/${id}`, dto);

const getShows = (params?: ShowsQueryParameters) =>
    agent.getRequest<ShowListDto[]>(`shows?${params?.toQueryString()}`);

const VenueRequests = {
    updateShow,
    getShows,
};

export default VenueRequests;
