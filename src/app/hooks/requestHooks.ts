import ShowRequests from "../api/Show.requests";
import UserRequests from "../api/User.requests";
import VenueRequests from "../api/Venue.requests";
import { useRequest } from "./useRequest";

//#region Venue
export const useCreateVenue = () => useRequest(VenueRequests.createVenue);
export const useDeleteVenue = () => useRequest(VenueRequests.deleteVenue);
export const useUpdateVenue = () => useRequest(VenueRequests.updateVenue);
export const useGetVenues = () => useRequest(VenueRequests.getVenues);
export const useGetVenue = () => useRequest(VenueRequests.getVenue);

// Shows
export const useCreateShow = () => useRequest(VenueRequests.createShow);
export const useUpdateShow = () => useRequest(ShowRequests.updateShow);
export const useGetShows = () => useRequest(ShowRequests.getShows);
//#endregion

//#region User
export const useRegisterUser = () => useRequest(UserRequests.registerUser);
export const useLoginUser = () => useRequest(UserRequests.loginUser);
//#endregion
