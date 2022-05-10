import React from "react";

import { useVenueDetailPageContext } from "./VenueDetailPage";
import { createVenueShowsSection } from "./VenueShowSection";
import TabContainer, { TabProps } from "../../../app/components/TabContainer";

export enum VenueDetailSectionIndexes {
  Shows = 0,
}

const VenueDetailSections = () => {
  const {
    state: { activeTabIndex },
    handlers: { handleChangeTabIndex },
  } = useVenueDetailPageContext();

  const tabs: TabProps[] = [
    createVenueShowsSection(VenueDetailSectionIndexes.Shows),
  ];

  return (
    <div>
      <TabContainer
        activeTabIndex={activeTabIndex}
        onTabIndexChange={handleChangeTabIndex}
        tabs={tabs}
      />
    </div>
  );
};

export default VenueDetailSections;
