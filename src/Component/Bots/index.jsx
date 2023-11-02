import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import BotsContent from "./BotsContent";

const BotsContain = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <BotsContent />
        </Row>
      </Container>
    </Fragment>
  );
};
export default BotsContain;
