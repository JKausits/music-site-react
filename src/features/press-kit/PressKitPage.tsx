import React from "react";
import PressKitAbout from "./PressKitAbout";
import PressKitContact from "./PressKitContact";
import PressKitDemos from "./PressKitDemos";
import PressKitImages from "./PressKitImages";
import { Col, Row } from "react-bootstrap";
import EventCalendar from "./EventCalendar";

const PressKitPage = () => {
  return (
    <Row>
      <Col md={6} x={12} className="mb-1">
        <h3>Joe Kausits</h3>
        <br />
        <PressKitImages />
      </Col>
      <Col md={6} x={12} className="mb-1">
        <PressKitDemos />
      </Col>
      <Col md={6} x={12} className="mt-1">
        <PressKitAbout />
      </Col>
      <Col md={6} x={12} className="mt-1">
        <PressKitContact />
      </Col>
      <Col md={12} x={12}>
        <EventCalendar />
      </Col>
    </Row>
  );
};

export default PressKitPage;
