import { createContext, useContext } from "react";
import {
  AuthenticationState,
  useAuthentication,
} from "../hooks/useAuthentication";
import {
  NotificationsState,
  useNotifications,
} from "../hooks/useNotifications";

const AppContext = createContext<{
  notification: NotificationsState;
  authentication: AuthenticationState;
}>(undefined!);

const AppContextProvider: React.FC<any> = ({ children }) => {
  const notification = useNotifications();
  const authentication = useAuthentication();

  return (
    <AppContext.Provider value={{ notification, authentication }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);
