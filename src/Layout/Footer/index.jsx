import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { P } from "../../AbstractElements";

const Footer = () => {
  return (
    <Fragment>
      <footer
        className="footer"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          marginLeft: 0,
        }}
      >
        <Container fluid={true}>
          <Row>
            <Col md="12" className="footer-copyright text-center">
              <P attrPara={{ className: "mb-0" }}>Copyright 2023 © Ulai.in </P>
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment>
  );
};
export default Footer;
