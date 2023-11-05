import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3, H1 } from "../../AbstractElements";
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
import CreateBotFormModal from "./components/CreateBotFormModal";

const BotContent = () => {
  const points = ['Create a fully customizable AI Bot within a few minutes, no code required.',
'Embed it on your website as a chatbot or as an iFrame widget.',
'Focus on the customers who matter to you the most.'
]
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
  return (
    <Fragment>
       <div style={{ borderRadius: '1rem'}} className="container d-flex flex-column justify-content-evenly align-items-start  p-4 bg-white">
        <div className="d-inline ">
        <H4 attrH4={{ className: 'mt-0 mb-3' }}>Welcome to ulai Bot</H4>
        </div>
        <div className="d-flex flex-column align-items-center mb-3">
          {points.map((ele,id) => (
            <div className="w-100 d-flex  align-items-center mb-3">
              <BsCheckCircle style={{height: '17px', width: '17px'}} className='text-primary m-0'/>
              <H5 attrH5={{ className: 'my-0 ms-2' }}>{ele}</H5>
            </div>
          ))}
        </div>
        <div className="">
        <button type="button" className="btn btn-primary btn-md" onClick={toggle}>Create new bot</button>
        <CreateBotFormModal modal={modal} NewMessage={'New Bot'} toggle={toggle}></CreateBotFormModal>
        </div>
    </div>
    </Fragment>
  );
};
export default BotContent;
