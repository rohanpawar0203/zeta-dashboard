import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import BotInfoContent from "./BotInfo";
import WebSdkInfoContent from "./webSdkInfo";

const BotInfo = ({ boatId }) => {
  return (
    <Fragment>
      <BotInfoContent boatId={boatId} />
    </Fragment>
  );
};
export default BotInfo;
