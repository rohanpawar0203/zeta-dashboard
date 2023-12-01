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
                <SmallBot myBot={myBot} setcloseSmallBot={setcloseSmallBot} setbot={setbot}/>
              )}
            </div>
            <div
              onClick={() => {
                setbot("bigBot");
              }}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: `${myBot?.accentColor}`,
                cursor: 'pointer'
              }}
              className="d-flex align-items-center justify-content-center"
            >
              {myBot?.bubbleIcon === "BiBot" ? (
                <BiBot
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "BsRobot" ? (
                <BsRobot
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "TbMessageDots" ? (
                <TbMessageDots
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "BiUser" ? (
                <BiUser
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "AiOutlineQuestionCircle" ? (
                <AiOutlineQuestionCircle
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "TfiHeadphoneAlt" ? (
                <TfiHeadphoneAlt
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "Ri24HoursLine" ? (
                <Ri24HoursLine
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "LuMessagesSquare" ? (
                <LuMessagesSquare
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              ) : myBot?.bubbleIcon === "TfiCommentsSmiley" ? (
                <TfiCommentsSmiley
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
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

export default ChatBot;
