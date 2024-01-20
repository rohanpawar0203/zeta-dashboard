import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
  Card,
  CardBody,
  Col,
  Media,
  Container,
  Row,
  CardHeader,
} from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import {
  H4,
  H6,
  LI,
  P,
  UL,
  Image,
  H5,
  H3,
  H1,
  Btn,
  Spinner,
} from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
import {
  AddNew,
  AllFiles,
  Files,
  Folders,
  RecentlyOpenedFiles,
  Textarea,
} from "../../Constant";
import {
  BoxSvg,
  BoxSvg1,
  CancelledSvg,
  CancelledSvg1,
  DollerSvg,
  MessageSvg,
  NewUsersSvg,
  PendingSvg,
  PendingSvg1,
  ProductSvg,
  TruckSvg,
  TruckSvg1,
} from "../Widgets/SvgIcons";
import { BsCheckCircle } from "react-icons/bs";
import { Form, FormGroup, Input, Label } from "reactstrap";
import EmbedWidget from "./EmbedWidget";

const WhatsAppWidgetContent = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card className="mt-2">
              {/* <CardHeader className="w-100 d-flex justify-content-between">
        <H5>{'Whatsapp Widget'}</H5>
      </CardHeader> */}
              <CardBody>
                <EmbedWidget />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default WhatsAppWidgetContent;
