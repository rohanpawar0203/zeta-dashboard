import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3, H1, Spinner } from "../../AbstractElements";
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
import {BsCheckCircle} from 'react-icons/bs'
import { BotCreate } from "../../api";
import Customize from "./components/Customize";
import Share from "./components/Share";
import ChatBot from "./components/ChatBot";
import appStore from "../Live Chats/Client/AppStore";

const BotInfoContent = ({boatId}) => {
  const {setBotDetails} = appStore.getState();
  console.log('got here boat id ', boatId);
  const [myBot, setMyBot] = useState({});
  const [pillTab, setpillTab] = useState('1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBotData = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${BotCreate}/${boatId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();
        console.log('resond ', responseData);
        if (response.ok) {
          setMyBot(responseData);
          setBotDetails(responseData)
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };
    fetchBotData();
  }, []);


    return (
    <Fragment>
      <Container fluid={true} >
        <Row>   
      <Col sm="12" xl="6 xl-100 box-col-12">
      <Card className="mt-2">
        <div style={{height: '90vh'}}>
        <CardBody>
          <Nav className="nav-pills">
            <div className="w-100  d-flex justify-content-center align-items-center">
            <div style={{background: 'whitesmoke'}} className="d-flex border border-lightgray p-1 rounded">
            <NavItem style={{cusror: 'pointer'}}>
              <NavLink  className={pillTab === '1' ? 'active cursor-pointer' : 'cursor-pointer'} onClick={() => setpillTab('1')}>{"Settings"}</NavLink>
            </NavItem>
            <NavItem >
              <NavLink  className={pillTab === '2' ? 'active cursor-pointer' : 'cursor-pointer'} onClick={() => setpillTab('2')}>{'Share'}</NavLink>
            </NavItem>
            <NavItem>
            </NavItem>
            </div>
            </div>
          </Nav>
          
            {
              loading ? 
              <div className="loader-box">
              <Spinner attrSpinner={{ className: 'loader-3' }} />
              </div> :
              <>
              <TabContent activeTab={pillTab} className="position-relative">
              <TabPane className="fade show h-100" tabId="1">
              <Customize myBot={myBot} setMyBot={setMyBot} setLoading={setLoading}/>
              </TabPane>
              <TabPane tabId="2" className="vh-75">
              <Share myBot={myBot}/>
               </TabPane>
               </TabContent>
               <ChatBot myBot={myBot} setMyBot={setMyBot}/>
              </>
            }
            
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
