import React, { createContext, useContext } from "react";
import HomeDescription from "./HomeDescription";
import HomePageImages from "./HomePageImages";
import HomeUpcomingShows from "./HomeUpcomingShows";
import { HomePageProps, useHomePage } from "./useHomePage";
import { Col, Row } from "react-bootstrap";
const HomePageContext = createContext<HomePageProps>(undefined!);
export const useHomePageContext = () => useContext(HomePageContext);
const HomePage = () => {
  const homePageProps = useHomePage();

  return (
    <HomePageContext.Provider value={homePageProps}>
      <Row>
        <Col xs={12} md={6}>
          <HomePageImages />
        </Col>
        <Col xs={12} md={6}>
          <HomeDescription />
        </Col>
        <Col md={12} className="mt-3">
          <h4>Upcoming Shows</h4>
          <hr />
        </Col>
        <Col md={12}>
          <HomeUpcomingShows />
        </Col>
      </Row>
    </HomePageContext.Provider>
  );
};

export default HomePage;
