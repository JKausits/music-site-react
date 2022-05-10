import React, { Fragment, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { ShowListDto, ShowsQueryParameters } from "../../app/dtos/Shows.dto";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { useGetShows } from "../../app/hooks/requestHooks";
import { ValueFormatter } from "../../app/formatters/Value.formatter";

const styles = (
  <style>
    {`#calendar table td {
        text-align: center;
        border: 1px solid var(--bs-blue);
        position: relative;
        height: 118px;
    }

@media only screen and (max-width: 391px) {
  #calendar table th {
    width: 46px;
    font-size: 0.55rem;
}

#calendar table td {
  height: 46px;
  font-size: 0.6rem;
}

}

.event {
    background: var(--bs-teal);
    color: white;
    padding: 4px;
    cursor: pointer;
}

#calendar table th {
text-align: center;
background-color: var(--bs-blue);
color: white;
padding-bottom: 12px;
width: 118px;
}

#calendar {
    border: 1px solid var(--bs-blue);
    border-collapse: collapse;
    position: relative;
}
#calendar table {
    border-collapse: collapse;
    background: var(--bs-gray-300);
    color: black;
    width: 100%;
  }

#calendar-controls {
    background-color: var(--bs-blue);
    color: white;
}

.control-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.control-btn:hover {
  background: #0062cc;
  color: var(--bs-gray-400)
}
`}
  </style>
);

export const getMonthDays = (year: number, month: number) => {
  let date = moment(new Date(year, month, 1));
  date.get("weeks");
  let daysInMonth = date.daysInMonth();
  const dates: Moment[] = [];
  while (daysInMonth--) {
    dates.push(date);
    date = date.clone().add(1, "day");
  }
  return dates;
};

const normalizeDays = (days: Moment[]) => {
  const normalized = days.reduce<{ [key: number]: Moment[] }>((acc, x) => {
    const monthNumber = x.month();
    const dayNumber = x.day();
    const weekNumber = x.week() === 1 && monthNumber === 11 ? 52 : x.week() - 1;

    const week = acc[weekNumber] || Array(7).fill(null);
    week[dayNumber] = x;
    acc[weekNumber] = week;
    return acc;
  }, {});

  return Object.entries(normalized)
    .sort(([a], [b]) => (+a > +b ? 1 : -1))
    .map(([, value]) => value);
};

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [normalizedDays, setNormalizedDays] = useState<Moment[][]>(
    [...Array(0).fill(null)].map((_) => Array(7).fill(null))
  );

  const [params, setParams] = useState<ShowsQueryParameters>(
    new ShowsQueryParameters({
      startDate: currentDate.startOf("month").toDate(),
      endDate: currentDate.endOf("month").toDate(),
    })
  );
  const [getShows, shows, getShowsRequestState] = useGetShows();

  //#region UI Helpers
  const renderEvent = (show?: ShowListDto) => {
    if (show == null) return <Fragment></Fragment>;

    return (
      <Fragment>
        <OverlayTrigger
          overlay={
            <Tooltip>
              <p>
                Name: <strong>{show.name}</strong>
              </p>
              <p>
                Venue: <strong>{show.venue.name}</strong>
              </p>
              <p>
                Date:{" "}
                <strong>
                  {ValueFormatter.formatDateTimeRange(show.startAt, show.endAt)}
                </strong>
              </p>
            </Tooltip>
          }
        >
          <div className="event">Booked</div>
        </OverlayTrigger>
      </Fragment>
    );
  };

  const renderDay = (date?: Moment, index: number = 0) => {
    const show = shows?.find(
      (show) => date != null && moment(show.startAt).isSame(date, "day")
    );
    return (
      <td key={date?.date() || `placeholder-${index}`}>
        <div className="d-flex flex-column mt-2 h-100">
          {date?.date()}
          {renderEvent(show)}
        </div>
      </td>
    );
  };

  const renderWeek = (dates: Moment[], index: number) => (
    <tr key={`week-${index}`}>{dates.map(renderDay)}</tr>
  );

  const renderControls = () => {
    return (
      <span
        className="d-flex justify-content-between align-items-center px-1 py-3"
        id="calendar-controls"
      >
        <div
          className={
            "control-btn d-flex justify-content-center align-items-center"
          }
          onClick={handlePreviousMonthClicked}
        >
          <i className="bi bi-chevron-left"></i>
        </div>

        <h4>{currentDate.format("MMMM - yyyy")}</h4>
        <div
          className={
            "control-btn d-flex justify-content-center align-items-center"
          }
          onClick={handleNextMonthClicked}
        >
          <i className="bi bi-chevron-right"></i>
        </div>
      </span>
    );
  };

  const renderLoader = () => {
    if (!getShowsRequestState.isLoading) return <Fragment></Fragment>;

    return (
      <div
        style={{
          zIndex: 5,
          width: "100%",
          background: "var(--bs-gray-800)",
        }}
        className="position-absolute d-flex h-100 align-items-center justify-content-center opacity-75"
      >
        <Spinner
          animation={"border"}
          style={{ width: "10rem", height: "10rem" }}
        />
      </div>
    );
  };
  //#endregion

  //#region Handlers
  const handleNextMonthClicked = () =>
    setCurrentDate((currentDate) => currentDate.clone().add(1, "months"));
  const handlePreviousMonthClicked = () =>
    setCurrentDate((currentDate) => currentDate.clone().add(-1, "months"));
  //#endregion

  //#region Effects
  useEffect(() => {
    const days = getMonthDays(currentDate.year(), currentDate.month());
    setNormalizedDays(normalizeDays(days));
    setParams((params) =>
      params.setDateRanges(
        currentDate.startOf("month").toDate(),
        currentDate.endOf("month").toDate()
      )
    );
  }, [currentDate, setNormalizedDays]);

  useEffect(() => {
    getShows(params);
  }, [params, getShows]);
  //#endregion

  return (
    <Fragment>
      {styles}
      <div id="calendar">
        {renderLoader()}
        {renderControls()}
        <table>
          <thead>
            <tr>
              {moment.weekdays().map((weekday) => (
                <th key={weekday}>{weekday}</th>
              ))}
            </tr>
          </thead>
          <tbody>{normalizedDays.map(renderWeek)}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default EventCalendar;
