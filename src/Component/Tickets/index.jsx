import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import CreateTicketContent from "./CreateTicketContent";

const CreateTicketContain = () => {
  console.log('CreateTicketContain');
  return (
    <Fragment>
          <CreateTicketContent />
    </Fragment>
  );
};
export default CreateTicketContain;
