import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3 } from "../../AbstractElements";
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
import { connectWithSocketIOServer } from "../Live Chats/Client/wss";
import { WhatsAppAnalyticsAPI } from "../../api";

const userData = JSON.parse(sessionStorage.getItem("currentUser"));
const DashboardContent = () => {
  const [whatsAppAnalytics, setwhatsAppAnalytics] = useState({});

  const getWhatsAppAnalytics = async () => {
    try {
      const current_date = new Date();
      const currentDate = new Date().toGMTString();
      const start_date = new Date(
        `${current_date.getFullYear()}-${current_date.getMonth() + 1}-01`
      ).toGMTString();
      const payLoad = {
        dateFrom: start_date,
        dateAt: currentDate,
        phoneNumber: `${userData?.contact}`,
      };
      const res = await axios.post(WhatsAppAnalyticsAPI, payLoad);
      const result = await res?.data[0];
      const whatsappDeliveredCount = result?.whatsappDeliveredCount[0]
        ?.deliveredCount
        ? result?.whatsappDeliveredCount[0]?.deliveredCount
        : "NA";
      const whatsappReadCount = result?.whatsappReadCount[0]?.readCount
        ? result?.whatsappReadCount[0]?.readCount
        : "NA";
      const whatsappSentCount = result?.whatsappSentCount[0]?.sentCount
        ? result?.whatsappSentCount[0]?.sentCount
        : "NA";
      setwhatsAppAnalytics({
        whatsappDeliveredCount,
        whatsappReadCount,
        whatsappSentCount,
      });
    } catch (error) {
      console.log("getWhatsAppAnalytics error got ", error);
    }
  };

  useEffect(() => {
    connectWithSocketIOServer();
    getWhatsAppAnalytics();
  }, []);

  return (
    <Fragment>
      <Fragment>
        <Container fluid={true} className="general-widget">
          <Row className="d-flex justify-content-evenly">
            <Fragment>
              <H3 attrH6={{ className: "font-roboto" }}>WhatsApp</H3>
              <Col sm="6" xl="3" lg="10">
                <Card className="o-hidden">
                  <CardBody>
                    <Media className="static-widget">
                      <Media body>
                        <H4 attrH6={{ className: "font-roboto" }}>
                          Messages <br /> Delivered
                        </H4>
                        <H5 attrH4={{ className: "mb-0 counter" }}>
                          <CountUp
                            end={whatsAppAnalytics?.whatsappDeliveredCount}
                          />
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
              <Col sm="6" xl="3" lg="10">
                <Card className="o-hidden">
                  <CardBody>
                    <Media className="static-widget">
                      <Media body>
                        <H4 attrH6={{ className: "font-roboto" }}>
                          Messages <br /> Read
                        </H4>
                        <H5 attrH4={{ className: "mb-0 counter" }}>
                          <CountUp end={whatsAppAnalytics?.whatsappReadCount} />
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
                          Messages <br /> Sent
                        </H4>
                        <H5 attrH4={{ className: "mb-0 counter" }}>
                          <CountUp end={whatsAppAnalytics?.whatsappSentCount} />
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
          {/* <Row>
            <TurnoverChart chartName="Total Queries-resolved"/>
            <TurnoverChart chartName="Total Messages received"/>
            <TurnoverChart chartName="Total Messages sent by Bot"/>
          </Row> */}
        </Container>
      </Fragment>
    </Fragment>
  );
};
export default DashboardContent;
