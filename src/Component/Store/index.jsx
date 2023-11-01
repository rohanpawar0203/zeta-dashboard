import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import StoreContent from "./StoreContent";

const StoreContain = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <StoreContent />
        </Row>
      </Container>
    </Fragment>
  );
};
export default StoreContain;
