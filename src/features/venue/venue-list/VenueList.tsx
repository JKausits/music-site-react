import React, { Fragment } from "react";
import DeleteButton from "../../../app/components/buttons/DeleteButton";
import { VenueDto } from "../../../app/dtos/Venues.dto";
import { ListGroup } from "react-bootstrap";
import AppLink from "../../../app/components/AppLink";
import OverlayConfirmDelete from "../../../app/components/OverlayConfirmDelete";

interface Props {
  venues: VenueDto[];
  onDelete(venue: VenueDto): Promise<void>;
}

const VenueList: React.FC<Props> = ({ venues, onDelete }) => {
  //#region UI Helpers
  const renderItem = (venue: VenueDto) => {
    return (
      <ListGroup.Item key={venue.id}>
        <div className="d-flex align-items-center">
          <h4>
            <AppLink to={`/venues/${venue.id}`} backText="Back to Venues">
              {venue.name}
            </AppLink>
          </h4>
          <div className="ms-auto">
            <OverlayConfirmDelete
              text={`Are you sure you want to delete ${venue.name}?`}
              placement="left"
              onConfirm={() => onDelete(venue)}
            >
              <DeleteButton tooltip={"Delete Venue"} />
            </OverlayConfirmDelete>
          </div>
        </div>
      </ListGroup.Item>
    );
  };

  //#endregion
  return <Fragment>{venues.map(renderItem)}</Fragment>;
};

export default VenueList;
