import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5 } from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
import {
  AddNew,
  AllFiles,
  Files,
  Folders,
  RecentlyOpenedFiles,
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

const DashboardContent = () => {
  return (
    <Fragment>
      <Fragment>
        <Container fluid={true} className="general-widget">
          <Row className="d-flex justify-content-evenly">
            <Fragment>
              <Col sm="6" xl="3" lg="10">
                <Card className="o-hidden">
                  <CardBody>
                    <Media className="static-widget">
                      <Media body>
                        <H4 attrH6={{ className: "font-roboto" }}>
                          Queries-resolved
                        </H4>
                        <H5 attrH4={{ className: "mb-0 counter" }}>
                          <CountUp end={100} />
                        </H5>
                      </Media>
                      <DollerSvg />
                    </Media>
                    <div className="progress-widget">
                      <div className="progress sm-progress-bar progress-animate">
                        <div
                          className={"progress-gradient-success"}
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <span className="animate-circle"></span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="6" xl="3" lg="10">
                <Card className="o-hidden">
                  <CardBody>
                    <Media className="static-widget">
                      <Media body>
                        <H4 attrH6={{ className: "font-roboto" }}>
                          Messages received
                        </H4>
                        <H5 attrH4={{ className: "mb-0 counter" }}>
                          <CountUp end={100} />
                        </H5>
                      </Media>
                      <MessageSvg />
                    </Media>
                    <div className="progress-widget">
                      <div className="progress sm-progress-bar progress-animate">
                        <div
                          className={"progress-gradient-primary"}
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <span className="animate-circle"></span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="6" xl="3" lg="10">
                <Card className="o-hidden">
                  <CardBody>
                    <Media className="static-widget">
                      <Media body>
                        <H4 attrH6={{ className: "font-roboto" }}>
                          Bot Messages sent{" "}
                        </H4>
                        <H5 attrH4={{ className: "mb-0 counter" }}>
                          <CountUp end={100} />
                        </H5>
                      </Media>
                      <MessageSvg />
                    </Media>
                    <div className="progress-widget">
                      <div className="progress sm-progress-bar progress-animate">
                        <div
                          className={"progress-gradient-success"}
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <span className="animate-circle"></span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Fragment>
          </Row>
          <Row>
            <TurnoverChart chartName="Total Queries-resolved"/>
            <TurnoverChart chartName="Total Messages received"/>
            <TurnoverChart chartName="Total Messages sent by Bot"/>
          </Row>
        </Container>
      </Fragment>
    </Fragment>
  );
};
export default DashboardContent;
