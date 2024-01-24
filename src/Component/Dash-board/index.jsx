import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import DashboardContent from "./DashboardContent";

const DashboardContain = () => {
  return (
    <Fragment>
      <Container
        fluid={true}
        className="general-widget"
        style={{ height: "85vh", overflow: "scroll" }}
      >
        <Row style={{ gap: "5%", justifyContent: "center", marginTop: "2%" }}>
          <DashboardContent />
        </Row>
      </Container>
    </Fragment>
  );
};
export default DashboardContain;
