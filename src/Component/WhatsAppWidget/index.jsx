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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
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
  Spinner,
  Breadcrumbs,
} from "../../AbstractElements";
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
import { BsCheckCircle } from "react-icons/bs";
import appStore from "../Live Chats/Client/AppStore";
import ScrollBar from "react-perfect-scrollbar";
import Customization from "./Customization";
import EmbedWidget from "./EmbedWidget";
import Integrations from "./Integrations";
import Broadcasting from "./Broadcasting";

const WebSdkInfoContent = () => {
  const { setBotDetails, userData } = appStore.getState();
  const [pillTab, setpillTab] = useState("4");
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      <Breadcrumbs title="whatsApp" />
      <Container fluid={true}>
        <Row>
          <Col sm="12 bot-info-card">
            <Card>
              <div
                style={{
                  height: "72vh",
                  paddingBottom: "2rem",
                }}
              >
                <CardBody>
                  <ScrollBar>
                    <Nav className="nav-pills">
                      <div className="w-100  d-flex justify-content-center align-items-center">
                        <div
                          style={{ background: "whitesmoke" }}
                          className="d-flex border border-lightgray p-1 rounded"
                        >
                          <NavItem style={{ cursor: "pointer" }}>
                            <NavLink
                              className={
                                pillTab === "1"
                                  ? "active cursor-pointer"
                                  : "cursor-pointer"
                              }
                              onClick={() => setpillTab("1")}
                            >
                              {"Settings"}
                            </NavLink>
                          </NavItem>
                          <NavItem style={{ cursor: "pointer" }}>
                            <NavLink
                              className={
                                pillTab === "2"
                                  ? "active cursor-pointer"
                                  : "cursor-pointer"
                              }
                              onClick={() => setpillTab("2")}
                            >
                              {"Share"}
                            </NavLink>
                          </NavItem>
                          <NavItem style={{ cursor: "pointer" }}>
                            <NavLink
                              className={
                                pillTab === "3"
                                  ? "active cursor-pointer"
                                  : "cursor-pointer"
                              }
                              onClick={() => setpillTab("3")}
                            >
                              {"Integration"}
                            </NavLink>
                          </NavItem>
                          <NavItem style={{ cursor: "pointer" }}>
                            <NavLink
                              className={
                                pillTab === "4"
                                  ? "active cursor-pointer"
                                  : "cursor-pointer"
                              }
                              onClick={() => setpillTab("4")}
                            >
                              {"Broadcasting"}
                            </NavLink>
                          </NavItem>
                        </div>
                      </div>
                    </Nav>
                    <div style={{ height: "95%" }}>
                      {loading ? (
                        <div className="vh-75 loader-box">
                          <Spinner attrSpinner={{ className: "loader-3" }} />
                        </div>
                      ) : (
                        <>
                          <TabContent
                            activeTab={pillTab}
                            className="position-relative h-100"
                          >
                            <TabPane className="fade show h-100" tabId="1">
                              <Customization />
                            </TabPane>
                            <TabPane tabId="2" className="vh-75">
                              <EmbedWidget />
                            </TabPane>
                            <TabPane tabId="3" className="vh-75">
                              <Integrations />
                            </TabPane>
                            <TabPane tabId="4" className="vh-75">
                              <Broadcasting />
                            </TabPane>
                          </TabContent>
                        </>
                      )}
                    </div>
                  </ScrollBar>
                </CardBody>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default WebSdkInfoContent;
