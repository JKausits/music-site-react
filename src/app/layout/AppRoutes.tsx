import React from "react";
import { Route, Routes } from "react-router-dom";
import AnonymousGuard from "../components/authentiation-guards/AnonymousGuard";
import LoginUserPage from "../../features/user/login-user/LoginUserPage";
import LogoutUserPage from "../../features/user/logout-user/LogoutUserPage";
import AuthenticatedGuard from "../components/authentiation-guards/AuthenticatedGuard";
import VenueListPage from "../../features/venue/venue-list/VenueListPage";
import VenueDetailPage from "../../features/venue/venue-detail/VenueDetailPage";
import HomePage from "../../features/home/HomePage";
import PressKitPage from "../../features/press-kit/PressKitPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/venues">
        <Route
          path=""
          element={
            <AuthenticatedGuard>
              <VenueListPage />
            </AuthenticatedGuard>
          }
        />
        <Route
          path=":id"
          element={
            <AuthenticatedGuard>
              <VenueDetailPage />
            </AuthenticatedGuard>
          }
        />
      </Route>

      {/*<Route path="/register" element={<RegisterUserPage />} />*/}
      <Route
        path="/login"
        element={
          <AnonymousGuard>
            <LoginUserPage />
          </AnonymousGuard>
        }
      />
      <Route path="/logout" element={<LogoutUserPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/press-kit" element={<PressKitPage />} />
    </Routes>
  );
};

export default AppRoutes;
