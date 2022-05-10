import React from "react";
import { useHomePageContext } from "./HomePage";
import { Table } from "react-bootstrap";
import { ShowListDto } from "../../app/dtos/Shows.dto";
import { ValueFormatter } from "../../app/formatters/Value.formatter";

const HomeUpcomingShows = () => {
  const {
    state: { shows },
  } = useHomePageContext();

  //#region UI Helpers
  const renderRow = (show: ShowListDto) => {
    return (
      <tr key={show.id}>
        <td>{show.name}</td>
        <td>{show.venue.name}</td>
        <td>{ValueFormatter.formatDateTimeRange(show.startAt, show.endAt)}</td>
      </tr>
    );
  };
  //#endregion

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <td>Event Name</td>
            <td>Venue</td>
            <td>Date/Time</td>
          </tr>
        </thead>
        <tbody>
          {shows.length === 0 && (
            <tr>
              <td colSpan={3}>No Upcoming Shows</td>
            </tr>
          )}
          {shows.map(renderRow)}
        </tbody>
      </Table>
    </div>
  );
};

export default HomeUpcomingShows;
