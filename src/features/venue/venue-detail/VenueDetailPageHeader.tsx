import React from "react";
import { useVenueDetailPageContext } from "./VenueDetailPage";
import DeleteButton from "../../../app/components/buttons/DeleteButton";
import { Placeholder } from "react-bootstrap";
import OverlayConfirmDelete from "../../../app/components/OverlayConfirmDelete";
import EditButton from "../../../app/components/buttons/EditButton";

const VenueDetailPageHeader = () => {
  //#region State
  const {
    state: { venue, getVenueRequestState },
    handlers: { handleOpenUpdateVenueFormDialog, handleDeleteVenue },
  } = useVenueDetailPageContext();
  //#endregion

  //#region UI Helpers
  const getTitle = () => {
    if (getVenueRequestState.isLoading) return <Placeholder xs={8} md={4} />;

    return <h2>{venue.name}</h2>;
  };
  //#endregion

  return (
    <div className="d-flex justify-content-between align-items-center">
      {getTitle()}

      <div>
        <OverlayConfirmDelete
          text={`Are you sure you want to delete ${venue.name}?`}
          placement="left"
          onConfirm={handleDeleteVenue}
        >
          <DeleteButton tooltip={"Delete Venue"} />
        </OverlayConfirmDelete>
        <EditButton
          className="ms-2"
          tooltip="Edit Venue"
          onClick={handleOpenUpdateVenueFormDialog}
        />
      </div>
    </div>
  );
};

export default VenueDetailPageHeader;
