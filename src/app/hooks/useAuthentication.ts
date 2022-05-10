import { useEffect, useState } from "react";
import { AuthenticatedUserDto } from "../dtos/Users.dto";

export interface AuthenticationState {
  token: string | null;
  authenticatedUser?: AuthenticatedUserDto;
  isInitialized: boolean;
  isAuthenticated(): boolean;
  handleLogin(token: string): void;
  handleLogout(): void;
}

export const tokenName = "token";

export const getToken = () => localStorage.getItem(tokenName);

export const useAuthentication = (): AuthenticationState => {
  const [token, setToken] = useState<string | null>(getToken());
  const [isInitialized, setIsInitialized] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<
    AuthenticatedUserDto | undefined
  >();

  const handleLogin = (token: string) => {
    if (token != null) {
      localStorage.setItem(tokenName, token);
      setToken(token);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(tokenName);
    setToken(null);
  };

  const isAuthenticated = () => {
    return authenticatedUser?.isExpired() === false;
  };

  useEffect(() => {
    if (token) {
      setAuthenticatedUser(new AuthenticatedUserDto(token));
    } else {
      setAuthenticatedUser(undefined);
    }
    setIsInitialized(true);
  }, [token, setAuthenticatedUser, setIsInitialized]);

  useEffect(() => {
    setToken(getToken());
  }, [setToken]);

  return {
    token,
    authenticatedUser,
    isAuthenticated,
    isInitialized,
    handleLogin,
    handleLogout,
  };
};
