import React from "react";
import VenueFormDialog from "../components/VenueFormDialog";
import { useVenueListPage } from "./useVenueListPage";
import VenueList from "./VenueList";
import AppPagination from "../../../app/components/AppPagination";
import AddButton from "../../../app/components/buttons/AddButton";
const VenueListPage = () => {
  const venueListPageProps = useVenueListPage();
  const {
    state: { venueFormDialogIsOpen, venuesResult, getVenuesRequestState },
    handlers: {
      handleCloseCreateVenueFormDialog,
      handleOpenCreateVenueFormDialog,
      handleCreateVenue,
      handlePageChange,
      handleDeleteVenue,
    },
  } = venueListPageProps;

  return (
    <div>
      <VenueFormDialog
        isOpen={venueFormDialogIsOpen}
        onClose={handleCloseCreateVenueFormDialog}
        onSubmit={handleCreateVenue}
      />
      <div className="d-flex justify-content-end">
        <AddButton
          tooltip={"New Venue"}
          variant={"outline-primary"}
          onClick={handleOpenCreateVenueFormDialog}
          disabled={getVenuesRequestState.isLoading}
        >
          <span className="text-white">New Venue</span>
        </AddButton>
      </div>
      <div className="mt-3">
        <VenueList venues={venuesResult.items} onDelete={handleDeleteVenue} />
      </div>
      <div className="d-flex justify-content-center mt-2">
        <AppPagination
          onPageChange={handlePageChange}
          pagination={venuesResult}
        />
      </div>
    </div>
  );
};

export default VenueListPage;
