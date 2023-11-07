import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row, DropdownMenu, DropdownItem, Dropdown } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3, H1, Btn } from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
import {HiOutlineDotsVertical} from 'react-icons/hi'
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

const BotsContent = () => {
  const points = ['Create a fully customizable AI Bot within a few minutes, no code required.',
'Embed it on your website as a chatbot or as an iFrame widget.',
'Focus on the customers who matter to you the most.'
]
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);

const [renameBotId, setRenameBotId] = useState();
const [myBots, setMyBots] = useState([]);
const user = JSON.parse(localStorage.getItem("currentUser"));
const token = localStorage.getItem("token");
const [isHovered, setisHovered] = useState(false);
  const hoverStyle = {
    background: 'whitesmoke',
    cursor: 'pointer'
  }

const getAllBot = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/bot/${user._id}/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await response.json();
    console.log("responseData:", responseData);
    if (response.ok && responseData.length > 0) {
      setMyBots(responseData);
    } else {
      setMyBots([]);
      toast.error(responseData.message);
    }
  } catch (error) {
    toast.error(error);
  }
};

const deleteBot = async (botId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/bot/${botId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      getAllBot();
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }
  } catch (error) {
    toast.error(error);
  }
};

useEffect(() => {
  const fetchBotData = async () => {
    getAllBot();
  };
  if (user.bots && user.bots.length > 0) {
    fetchBotData();
  }
}, []);

  return (
    <Fragment>
      <div style={{height: '75vh', background: 'white', padding: '15px'}}>

        {myBots.length === 0 && (
          <div className="mw-100 h-100 border border-black d-flex flex-column justify-content-center align-items-center">
           <H6 className='mb-2 fw-bolder text-gray'>Create your first bot</H6>
           <H5 className='mb-2'>It will take less than a minute</H5>
          <button type="button" className="btn btn-primary btn-md" onClick={toggle}>Create new bot</button>
           <CreateBotFormModal modal={modal} NewMessage={'New Bot'} toggle={toggle} getAllBot={getAllBot}></CreateBotFormModal>
           </div>
        )}
        {myBots.length && 
          <>
          <H6 className='mb-2 fw-bolder text-gray'>1 live bots</H6>
          {myBots.map((myBot, i) => (
            <div key={i} className="w-100 d-flex border border-lightgray justify-content-between align-items-center p-3 mt-5 rounded">
            <div className="d-flex  align-items-center">
              <img src="https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75"
                  width={"42px"}
                  height={"42px"}
                  style={{padding:'4px', border:'1px solid #cbc6c2', borderRadius: '4px'}}
                />
              <H5 attrH5={{className: 'my-0 ms-2'}}>{myBot.botName}</H5>
            </div>
            <div className="d-flex justify-content-between align-items-center p-3">
              <button type="button" className="btn btn-primary me-2 btn-sm">View Bot</button>
              <div className="dropdown">
              <div style={{width: '30px', height: '30px', border: '1px solid lightgray', ...(isHovered && hoverStyle)}} className='d-flex justify-content-center align-items-center rounded dropbtn'
              onMouseEnter={() => {setisHovered(true)}} onMouseLeave={() => {setisHovered(false)}}>
              <HiOutlineDotsVertical style={{height: '17px', width: '17px'}} />
              </div>
                </div>
            </div>
        </div>
        ))
        }
        </>
        }
       </div>
    </Fragment>
  );
};
export default BotsContent;
