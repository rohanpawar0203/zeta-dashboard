import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import CreateTicketContent from "./CreateTicketContent";

const CreateTicketContain = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <CreateTicketContent />
          </Row>
          </Container>
    </Fragment>
  );
};
export default CreateTicketContain;
