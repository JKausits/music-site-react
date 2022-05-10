import React, { Fragment } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import AppContextProvider from "../contexts/App.context";
import NotificationContainer from "./NotificationContainer";
import Menu from "./Menu";
import AppRoutes from "./AppRoutes";
import Footer from "./Footer";

function App() {
  return (
    <Fragment>
      <Router>
        <AppContextProvider>
          <Menu />
          <NotificationContainer />
          <Container className="mt-3" style={{ marginBottom: "65px" }}>
            <AppRoutes />
          </Container>
          <Footer />
        </AppContextProvider>
      </Router>
    </Fragment>
  );
}

export default App;
