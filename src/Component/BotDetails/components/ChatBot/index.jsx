import SmallBot from "./components/SmallBot";
import BigBot from "./components/BigBot";
import { BsChevronDown } from "react-icons/bs";
import { BiBot } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { TbMessageDots } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TfiHeadphoneAlt, TfiCommentsSmiley } from "react-icons/tfi";
import { Ri24HoursLine } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import { useState } from "react";
import { botIconSrcs } from "../BotIcons";

const ChatBot = ({ myBot, setMyBot }) => {
  const [bot, setbot] = useState("smallBot");
  const [closeSmallBot, setcloseSmallBot] = useState(false);

  return (
    <div style={{ position: "absolute", bottom: "40px", right: "40px" }}>
      {bot === "smallBot" ? (
        <>
          <div className="d-flex flex-column justify-content-end align-items-end">
            <div className="mb-2">
              {!closeSmallBot && (
                <SmallBot myBot={myBot} setcloseSmallBot={setcloseSmallBot} setbot={setbot} closeSmallBot={closeSmallBot}/>
              )}
            </div>
            <div
              onClick={() => {
                setbot("bigBot");
              }}
              style={{
                width: "50px",
                height: "50px",
                zIndex: "1",
                borderRadius: "50%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                // border : `1px solid ${myBot?.accentColor}` ,
                // background: `${myBot?.accentColor}`,
                cursor: 'pointer'
              }}
              className="d-flex align-items-center justify-content-center"
            >
              {myBot?.bubbleIcon === "BiBot" ? (
                // <BiBot
                //   style={{
                //     width: "30px",
                //     height: "30px",
                //     color: "white",
                //     fontWeight: "600",
                //   }}
                // />
                <ImgElement imgSource={botIconSrcs[0]} imgInfoNum={1}/>
              ) : myBot?.bubbleIcon === "BsRobot" ? (
                // <BsRobot
                //   style={{
                //     width: "30px",
                //     height: "30px",
                //     color: "white",
                //     fontWeight: "600",
                //   }}
                // />
                <ImgElement imgSource={botIconSrcs[1]} imgInfoNum={2}/>
              ) : myBot?.bubbleIcon === "TbMessageDots" ? (
                // <TbMessageDots
                //   style={{
                //     width: "30px",
                //     height: "30px",
                //     color: "white",
                //     fontWeight: "600",
                //   }}
                // />
                <ImgElement imgSource={botIconSrcs[2]} imgInfoNum={3}/>
              ) : myBot?.bubbleIcon === "BiUser" ? (
                // <BiUser
                //   style={{
                //     width: "30px",
                //     height: "30px",
                //     color: "white",
                //     fontWeight: "600",
                //   }}
                // />
                <ImgElement imgSource={botIconSrcs[3]} imgInfoNum={4}/>
                ) : myBot?.bubbleIcon === "AiOutlineQuestionCircle" ? (
                  // <AiOutlineQuestionCircle
                  // style={{
                  //   width: "30px",
                  //   height: "30px",
                  //   color: "white",
                  //   fontWeight: "600",
                  // }}
                  // />
                  <ImgElement imgSource={botIconSrcs[4]} imgInfoNum={5}/>
                  ) : myBot?.bubbleIcon === "TfiHeadphoneAlt" ? (
                  //   <TfiHeadphoneAlt
                  // style={{
                  //   width: "30px",
                  //   height: "30px",
                  //   color: "white",
                  //   fontWeight: "600",
                  // }}
                  // />
                  <ImgElement imgSource={botIconSrcs[5]} imgInfoNum={6}/>
                  ) : myBot?.bubbleIcon === "Ri24HoursLine" ? (
                //     <Ri24HoursLine
                //   style={{
                //     width: "30px",
                //     height: "30px",
                //     color: "white",
                //     fontWeight: "600",
                //   }}
                // />
                <ImgElement imgSource={botIconSrcs[6]} imgInfoNum={7}/>
                ) : myBot?.bubbleIcon === "LuMessagesSquare" ? (
                  // <LuMessagesSquare
                  // style={{
                  //   width: "30px",
                  //   height: "30px",
                  //   color: "white",
                  //   fontWeight: "600",
                  // }}
                  // />
                  <ImgElement imgSource={botIconSrcs[7]} imgInfoNum={8}/>
                  ) : myBot?.bubbleIcon === "TfiCommentsSmiley" ? (
                  //   <TfiCommentsSmiley
                  // style={{
                  //   width: "30px",
                  //   height: "30px",
                  //   color: "white",
                  //   fontWeight: "600",
                  // }}
                  // />
                  <ImgElement imgSource={botIconSrcs[8]} imgInfoNum={9}/>
                  ) : (
                    ""
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-column justify-content-end align-items-end">
            <div className="mb-2">
              <BigBot myBot={myBot} />
            </div>
            <div
              onClick={() => {
                setbot("smallBot");
              }}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: myBot?.accentColor,
                cursor: 'pointer'
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <BsChevronDown
                style={{
                  width: "30px",
                  height: "30px",
                  color: "white",
                  fontWeight: "600",
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const ImgElement = ({imgSource, imgInfoNum}) => {
  return (
    <img style={{ width: "50px", height: "50px" }} src={imgSource} alt={`bot_icon_0${imgInfoNum}.png`} />
  )
}

export default ChatBot;
