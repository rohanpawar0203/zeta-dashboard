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
import { BotCreate } from "../../api";
import Customize from "./components/Customize";
import Share from "./components/Share";
import ChatBot from "./components/ChatBot";
import appStore from "../Live Chats/Client/AppStore";
import Knowledge from "./components/Knowledge";
import ScrollBar from "react-perfect-scrollbar";

const BotInfoContent = ({ boatId }) => {
  const { setBotDetails } = appStore.getState();
  const [myBot, setMyBot] = useState({});
  const [pillTab, setpillTab] = useState("1");
  const [loading, setLoading] = useState(false);

  const fetchBotData = async (boatId) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BotCreate}/${boatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setMyBot(responseData);
        setBotDetails(responseData);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBotData(boatId);
  }, []);

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12 bot-info-card">
            <Card>
              <div
                style={{
                  height: "70vh",
                  marginBottom: "5vh",
                  overflow: "hidden",
                  paddingBottom: "10vh",
                }}
              >
                <CardBody className="h-100">
                  <Knowledge myBot={myBot} />
                </CardBody>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default BotInfoContent;
