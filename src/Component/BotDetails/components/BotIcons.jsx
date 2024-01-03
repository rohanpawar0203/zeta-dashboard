import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiBot } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { TbMessageDots } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TfiHeadphoneAlt, TfiCommentsSmiley } from "react-icons/tfi";
import { Ri24HoursLine } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";

export const botIconSrcs = [
  require('../../../assets/images/bot-icons/bot_icon_01.png'),
  require('../../../assets/images/bot-icons/bot_icon_02.png'),
  require('../../../assets/images/bot-icons/bot_icon_03.png'),
  require('../../../assets/images/bot-icons/bot_icon_04.png'),
  require('../../../assets/images/bot-icons/bot_icon_05.png'),
  require('../../../assets/images/bot-icons/bot_icon_06.png'),
  require('../../../assets/images/bot-icons/bot_icon_07.png'),
  require('../../../assets/images/bot-icons/bot_icon_08.png'),
  require('../../../assets/images/bot-icons/bot_icon_09.png')
]

const BotIcons = ({ botIcons, setMyBot, myBot}) => {
  return (
    <>
      {botIcons.map((ele, i) => {
        if (ele === "BiBot") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <BiBot style={{ width: "30px", height: "30px" }} /> */}
              <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[0]} alt="bot_icon_01.png" />
            </div>
          );
        }
        if (ele === "BsRobot") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <BsRobot style={{ width: "30px", height: "30px" }} /> */}
              <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[1]} alt="bot_icon_02.png" />
            </div>
          );
        }
        if (ele === "TbMessageDots") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <TbMessageDots style={{ width: "30px", height: "30px" }} /> */}
              <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[2]} alt="bot_icon_03.png" />
            </div>
          );
        }
        if (ele === "BiUser") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <BiUser style={{ width: "30px", height: "30px" }} /> */}
            <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[3]} alt="bot_icon_04.png" />

            </div>
          );
        }
        if (ele === "AiOutlineQuestionCircle") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <AiOutlineQuestionCircle style={{ width: "30px", height: "30px" }} /> */}
            <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[4]} alt="bot_icon_05.png" />

            </div>
          );
        }
        if (ele === "TfiHeadphoneAlt") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <TfiHeadphoneAlt style={{ width: "30px", height: "30px" }} /> */}
            <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[5]} alt="bot_icon_06.png" />

            </div>
          );
        }
        if (ele === "Ri24HoursLine") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <Ri24HoursLine style={{ width: "30px", height: "30px" }} /> */}
            <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[6]} alt="bot_icon_07.png" />

            </div>
          );
        }
        if (ele === "LuMessagesSquare") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <LuMessagesSquare style={{ width: "30px", height: "30px" }} /> */}
            <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[7]} alt="bot_icon_08.png" />

            </div>
          );
        }
        if (ele === "TfiCommentsSmiley") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              {/* <TfiCommentsSmiley style={{ width: "30px", height: "30px" }} /> */}
            <img style={{ width: "50px", height: "50px" }} src={botIconSrcs[8]} alt="bot_icon_09.png" />

            </div>
          );
        }
      })}
    </>
  );
};

export default BotIcons;
