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
              <BiBot style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "BsRobot") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <BsRobot style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "TbMessageDots") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <TbMessageDots style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "BiUser") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <BiUser style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "AiOutlineQuestionCircle") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <AiOutlineQuestionCircle style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "TfiHeadphoneAlt") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <TfiHeadphoneAlt style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "Ri24HoursLine") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <Ri24HoursLine style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "LuMessagesSquare") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <LuMessagesSquare style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "TfiCommentsSmiley") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              className={`p-2 shadow-sm rounded border border-lightgray d-flex justify-content-center align-items-center ms-4 
              ${ele === myBot?.bubbleIcon ? 'border-primary' : ''}`}
            >
              <TfiCommentsSmiley style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
      })}
    </>
  );
};

export default BotIcons;
