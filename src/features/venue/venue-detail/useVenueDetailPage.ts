import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../app/contexts/App.context";
import { RequestStateDto } from "../../../app/dtos/RequestState.dto";
import { ShowDto, ShowRequestDto } from "../../../app/dtos/Shows.dto";
import { VenueRequestDto, VenueDetailDto } from "../../../app/dtos/Venues.dto";
import {
  useCreateShow,
  useDeleteVenue,
  useGetVenue,
  useUpdateShow,
  useUpdateVenue,
} from "../../../app/hooks/requestHooks";
import { useDialog } from "../../../app/hooks/useDialog";
import { useTabIndex } from "../../../app/hooks/useTabIndex";
import { VenueDetailSectionIndexes } from "./VenueDetailSections";

export interface VenueDetailPageProps {
  state: {
    venue: VenueDetailDto;
    getVenueRequestState: RequestStateDto;
    updateVenueRequestState: RequestStateDto;
    deleteVenueRequestState: RequestStateDto;
    venueFormDialogIsOpen: boolean;
    activeTabIndex: number;
    shows: {
      showFormDialogIsOpen: boolean;
      upsertShowRequestState: RequestStateDto;
      selectedShow?: ShowDto;
    };
  };
  handlers: {
    handleOpenUpdateVenueFormDialog(): void;
    handleUpdateVenue(dto: VenueRequestDto): Promise<any>;
    handleCloseUpdateVenueFormDialog(): void;
    handleChangeTabIndex(index: number): void;
    handleDeleteVenue(): Promise<any>;
    shows: {
      handleOpenCreateShowFormDialog(): void;
      handleCloseShowFormDialog(): void;
      handleOpenUpdateShowFormDialog(dto: ShowDto): void;
      handleUpsertShow(dto: ShowRequestDto): Promise<any>;
    };
  };
}

export const useVenueDetailPage = (): VenueDetailPageProps => {
  //#region State
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<VenueDetailDto>();
  const [
    venueFormDialogIsOpen,
    handleOpenVenueFormDialog,
    handleCloseVenueFormDialog,
  ] = useDialog();

  const [
    showFormDialogIsOpen,
    handleOpenShowFormDialog,
    handleCloseShowFormDialog,
  ] = useDialog();

  const [activeTabIndex, handleChangeTabIndex] = useTabIndex(
    VenueDetailSectionIndexes.Shows
  );

  const {
    notification: { sendSuccessNotification },
  } = useAppContext();

  const [selectedShow, setSelectedShow] = useState<ShowDto>();

  const navigate = useNavigate();
  //#endregion

  //#region Requests
  const [getVenue, , getVenueRequestState] = useGetVenue();

  const [updateVenue, , updateVenueRequestState, clearUpdateVenueErrors] =
    useUpdateVenue();

  const [createShow, , createShowRequestState, clearCreateShowErrors] =
    useCreateShow();

  const [updateShow, , updateShowRequestState, clearUpdateShowErrors] =
    useUpdateShow();

  const [deleteVenue, , deleteVenueRequestState] = useDeleteVenue();
  //#endregion

  //#region Handlers

  // Update Venue
  const handleOpenUpdateVenueFormDialog = () => {
    clearUpdateVenueErrors();
    handleOpenVenueFormDialog();
  };

  const handleUpdateVenue = async (dto: VenueRequestDto) => {
    const result = await updateVenue({ id: id!, dto });
    if (result != null) {
      sendSuccessNotification("Venue Updated", "");
      handleCloseVenueFormDialog();
      setVenue((venue) => ({ ...venue!, ...result }));
    }
  };

  //#endregion

  const handleOpenShowDialog = (dto?: ShowDto) => {
    clearCreateShowErrors();
    clearUpdateShowErrors();
    setSelectedShow(dto);

    handleOpenShowFormDialog();
  };

  //#region Create Show

  const handleOpenCreateShowFormDialog = () => handleOpenShowDialog();

  const handleCreateShow = async (dto: ShowRequestDto) => {
    const result = await createShow({ id: id!, dto });
    if (result != null) {
      sendSuccessNotification("Show Created", "");
      handleCloseShowFormDialog();
      setVenue((venue) => ({ ...venue!, shows: [...venue!.shows, result] }));
    }
  };
  //#endregion

  //#region Update Show
  const handleOpenUpdateShowFormDialog = (show: ShowDto) =>
    handleOpenShowDialog(show);

  const handleUpdateShow = async (dto: ShowRequestDto) => {
    const result = await updateShow({ id: selectedShow?.id!, dto });
    if (result != null) {
      sendSuccessNotification("Show Updated", "");
      handleCloseShowFormDialog();
      const shows = venue!.shows.map((show) =>
        show.id === result.id ? result : show
      );
      setVenue((venue) => ({
        ...venue!,
        shows,
      }));
    }
  };

  const handleUpsertShow = async (dto: ShowRequestDto) => {
    selectedShow ? await handleUpdateShow(dto) : await handleCreateShow(dto);
  };
  //#endregion

  //#region Delete Venue
  const handleDeleteVenue = async () => {
    await deleteVenue(id!);
    sendSuccessNotification("Venue Deleted", "");
    navigate("/venues");
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    const load = async () => {
      if (id == null) return;
      const result = await getVenue(id);
      if (result) setVenue(result);
    };
    load();
  }, [id, getVenue, setVenue]);
  //#endregion

  return {
    state: {
      venue: venue || new VenueDetailDto(),
      getVenueRequestState,
      updateVenueRequestState,
      deleteVenueRequestState,
      venueFormDialogIsOpen,
      activeTabIndex,
      shows: {
        upsertShowRequestState: selectedShow
          ? updateShowRequestState
          : createShowRequestState,
        showFormDialogIsOpen,
        selectedShow,
      },
    },
    handlers: {
      handleOpenUpdateVenueFormDialog,
      handleCloseUpdateVenueFormDialog: handleCloseVenueFormDialog,
      handleUpdateVenue,
      handleChangeTabIndex,
      handleDeleteVenue,
      shows: {
        handleCloseShowFormDialog,
        handleUpsertShow,
        handleOpenCreateShowFormDialog,
        handleOpenUpdateShowFormDialog,
      },
    },
  };
};
