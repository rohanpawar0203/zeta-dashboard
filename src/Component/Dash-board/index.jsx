import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import DashboardContent from "./DashboardContent";

const DashboardContain = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <DashboardContent />
        </Row>
      </Container>
    </Fragment>
  );
};
export default DashboardContain;
