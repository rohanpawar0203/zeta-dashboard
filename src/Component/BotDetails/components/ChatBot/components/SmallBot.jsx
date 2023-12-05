import React from "react";
import { RxCross2 } from "react-icons/rx";

const SmallBot = ({ setcloseSmallBot, myBot, setbot}) => {
  return (
    <div
      style={{
        width: "300px",
        borderRadius: "10px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        zIndex: "3",
        background: "white",
        cursor: 'pointer'
      }}
      className="border  p-3"
      onClick={() => {setbot((pre) => (pre === 'bigBot' ? 'smallBot' : 'bigBot'))}}
    >
      <div className="w-100 d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <img
            width={"30px"}
            height={"30px"}
            style={{ objectFit: "cover" }}
            src="https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75"
            alt=""
          />
          <h6 className="my-0 ms-3">{myBot?.companyName}</h6>
        </div>
        <div
          onClick={() => {
            setcloseSmallBot(true);
          }}
        >
          <RxCross2 style={{ width: "20px", height: "20px" }} />
        </div>
      </div>
      <p className="m-0" style={{ fontSize: "16px" }}>
        {myBot?.welcomeMessage}
      </p>
    </div>
  );
};

export default SmallBot;
