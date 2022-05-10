import React from "react";
import ShowFormDialog from "../../show/components/ShowFormDialog";
import { useVenueDetailPageContext } from "./VenueDetailPage";
import { ShowDto } from "../../../app/dtos/Shows.dto";
import EditButton from "../../../app/components/buttons/EditButton";
import { TabProps } from "../../../app/components/TabContainer";
import { Table } from "react-bootstrap";
import { ValueFormatter } from "../../../app/formatters/Value.formatter";
import AddButton from "../../../app/components/buttons/AddButton";

export const VenueShowsSection = () => {
  const { state, handlers } = useVenueDetailPageContext();
  const {
    venue: { shows },
  } = state;
  const { upsertShowRequestState, showFormDialogIsOpen, selectedShow } =
    state.shows;
  const {
    handleCloseShowFormDialog,
    handleUpsertShow,
    handleOpenCreateShowFormDialog,
    handleOpenUpdateShowFormDialog,
  } = handlers.shows;

  //#region UI Helpers
  const renderRow = (show: ShowDto) => (
    <tr key={show.id}>
      <td>{show.name}</td>
      <td>{ValueFormatter.formatDateTime(show.startAt)}</td>
      <td>{ValueFormatter.formatDateTime(show.endAt)}</td>
      <td>{ValueFormatter.formatCurrency(show.rate)}</td>
      <td>
        <EditButton
          tooltip="Edit Venue"
          onClick={() => handleOpenUpdateShowFormDialog(show)}
        />
      </td>
    </tr>
  );
  //#endregion

  return (
    <div>
      <div className="d-flex justify-content-end my-2">
        <AddButton
          tooltip={"Add Show"}
          onClick={handleOpenCreateShowFormDialog}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start At</th>
            <th>End At</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{shows.map(renderRow)}</tbody>
      </Table>

      <ShowFormDialog
        isOpen={showFormDialogIsOpen}
        show={selectedShow}
        requestState={upsertShowRequestState}
        onClose={handleCloseShowFormDialog}
        onSubmit={handleUpsertShow}
      />
    </div>
  );
};

export const createVenueShowsSection = (index: number): TabProps =>
  new TabProps(index, "Shows", <VenueShowsSection />);
