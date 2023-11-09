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

const BotIcons = ({ botIcons, setMyBot}) => {
  return (
    <>
      {botIcons.map((ele, i) => {
        if (ele === "BiBot") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-2 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <BiBot style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "BsRobot") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <BsRobot style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "TbMessageDots") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <TbMessageDots style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "BiUser") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <BiUser style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "AiOutlineQuestionCircle") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <AiOutlineQuestionCircle style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "TfiHeadphoneAlt") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <TfiHeadphoneAlt style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "Ri24HoursLine") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <Ri24HoursLine style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "LuMessagesSquare") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
            >
              <LuMessagesSquare style={{ width: "30px", height: "30px" }} />
            </div>
          );
        }
        if (ele === "TfiCommentsSmiley") {
          return (
            <div onClick={() => {setMyBot((pre) => ({...pre, bubbleIcon: ele}))}}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
              className="p-1 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
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
