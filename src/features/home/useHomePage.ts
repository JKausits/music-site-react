import { useEffect, useState } from "react";
import { RequestStateDto } from "../../app/dtos/RequestState.dto";
import { ShowListDto, ShowsQueryParameters } from "../../app/dtos/Shows.dto";
import { useGetShows } from "../../app/hooks/requestHooks";

export interface HomePageProps {
  state: {
    getShowsRequestState: RequestStateDto;
    shows: ShowListDto[];
  };
}

export const useHomePage = (): HomePageProps => {
  //#region Requests
  const [params] = useState<ShowsQueryParameters>(
    new ShowsQueryParameters({ startDate: new Date() })
  );
  const [getShows, shows, getShowsRequestState] = useGetShows();
  //#endregion

  //#region Effects
  useEffect(() => {
    getShows(params);
  }, [getShows, params]);
  //#endregion

  return {
    state: {
      getShowsRequestState,
      shows: shows || [],
    },
  };
};
