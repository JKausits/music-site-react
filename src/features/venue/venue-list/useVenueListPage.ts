import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../app/contexts/App.context";
import { PaginatedListDto } from "../../../app/dtos/PaginatedList.dto";
import { RequestStateDto } from "../../../app/dtos/RequestState.dto";
import {
  VenueDto,
  VenueQueryParametersDto,
  VenueRequestDto,
} from "../../../app/dtos/Venues.dto";
import {
  useCreateVenue,
  useDeleteVenue,
  useGetVenues,
} from "../../../app/hooks/requestHooks";
import { useDialog } from "../../../app/hooks/useDialog";

interface VenueListPageProps {
  handlers: {
    handleOpenCreateVenueFormDialog(): void;
    handleCloseCreateVenueFormDialog(): void;
    handleCreateVenue(dto: VenueRequestDto): Promise<any>;
    handlePageChange(page: number): void;
    handleDeleteVenue(dto: VenueDto): Promise<void>;
  };
  state: {
    venuesResult: PaginatedListDto<VenueDto>;
    venueFormDialogIsOpen: boolean;
    createVenueRequestState: RequestStateDto;
    getVenuesRequestState: RequestStateDto;
    deleteVenueRequestState: RequestStateDto;
  };
}

export const useVenueListPage = (): VenueListPageProps => {
  //#region State
  const [
    venueFormDialogIsOpen,
    handleOpenVenueFormDialog,
    handleCloseVenueFormDialog,
  ] = useDialog();

  const [params, setParams] = useState<VenueQueryParametersDto>(
    new VenueQueryParametersDto()
  );

  const {
    notification: { sendSuccessNotification },
  } = useAppContext();
  const navigate = useNavigate();
  //#endregion

  //#region Requests
  const [getVenues, venuesResult, getVenuesRequestState] = useGetVenues();
  const [createVenue, , createVenueRequestState, clearCreateVenueErrors] =
    useCreateVenue();
  const [deleteVenue, , deleteVenueRequestState] = useDeleteVenue();
  //#endregion

  //#region Handlers
  const handleCreateVenue = async (dto: VenueRequestDto) => {
    var result = await createVenue(dto);
    sendSuccessNotification("Venue Created", "");
    handleCloseVenueFormDialog();
    navigate(`/venues/${result!.id}`);
  };

  const handleOpenCreateVenueFormDialog = () => {
    clearCreateVenueErrors();
    handleOpenVenueFormDialog();
  };

  const handleDeleteVenue = async (dto: VenueDto) => {
    await deleteVenue(dto.id);
    sendSuccessNotification("Venue Deleted", "");
    if (venuesResult!.items.length === 1 && params.page !== 0) {
      handlePageChange(params.page - 1);
    } else {
      await getVenues(params);
    }
  };

  const handlePageChange = (page: number) => {
    setParams((params) => params.paginate(page, params.pageSize));
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    getVenues(params);
  }, [getVenues, params]);
  //#endregion

  return {
    handlers: {
      handleOpenCreateVenueFormDialog,
      handleCloseCreateVenueFormDialog: handleCloseVenueFormDialog,
      handleCreateVenue,
      handlePageChange,
      handleDeleteVenue,
    },
    state: {
      venuesResult: venuesResult || new PaginatedListDto<VenueDto>(),
      venueFormDialogIsOpen,
      createVenueRequestState,
      getVenuesRequestState,
      deleteVenueRequestState,
    },
  };
};
