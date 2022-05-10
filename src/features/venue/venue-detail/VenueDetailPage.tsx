import React, { createContext, useContext } from "react";
import { useVenueDetailPage, VenueDetailPageProps } from "./useVenueDetailPage";
import BackLink from "../../../app/components/links/BackLink";
import VenueFormDialog from "../components/VenueFormDialog";
import RequestAlert from "../../../app/components/alerts/RequestAlert";
import VenueDetailPageHeader from "./VenueDetailPageHeader";
import VenueDetailSections from "./VenueDetailSections";

const VenueDetailPageContext = createContext<VenueDetailPageProps>(undefined!);

export const useVenueDetailPageContext = () =>
  useContext(VenueDetailPageContext);

const VenueDetailPage = () => {
  const venueDetailPageProps = useVenueDetailPage();
  const {
    handlers: { handleCloseUpdateVenueFormDialog, handleUpdateVenue },
    state: {
      venue,
      venueFormDialogIsOpen,
      getVenueRequestState,
      deleteVenueRequestState,
    },
  } = venueDetailPageProps;
  return (
    <VenueDetailPageContext.Provider value={venueDetailPageProps}>
      <div className="my-2">
        <BackLink fallbackRoute="/venues">Back to Venues</BackLink>
      </div>
      <VenueDetailPageHeader />
      <RequestAlert requestState={getVenueRequestState} />
      <RequestAlert requestState={deleteVenueRequestState} />
      <VenueDetailSections />
      <VenueFormDialog
        isOpen={venueFormDialogIsOpen}
        venue={venue}
        onSubmit={handleUpdateVenue}
        onClose={handleCloseUpdateVenueFormDialog}
      />
    </VenueDetailPageContext.Provider>
  );
};

export default VenueDetailPage;
