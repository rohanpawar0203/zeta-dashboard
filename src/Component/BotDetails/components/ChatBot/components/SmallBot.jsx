import React from "react";
import { RxCross2 } from "react-icons/rx";

const SmallBot = ({ setcloseSmallBot, myBot, setbot, closeSmallBot}) => {
  return (
    <div
      style={{
        width: "300px",
        borderRadius: "10px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        zIndex: "1",
        background: "white"
      }}
      className="border  p-3"
    >
      <div className="w-100 d-flex align-items-center justify-content-between mb-3">
        <div style={{ cursor: 'pointer'}} className="d-flex align-items-center" onClick={() => {  
         setbot((pre) => (pre === 'bigBot' ? 'smallBot' : 'bigBot'))}}>
          <img
            width={"30px"}
            height={"30px"}
            style={{ objectFit: "cover", border: '1px solid skyblue',borderRadius: '2px'}}
            src={myBot?.companyLogo ? myBot?.companyLogo :  "https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75" }
            alt=""
          />
          <h6 className="my-0 ms-3">{myBot?.companyName}</h6>
        </div>
        <div style={{zIndex:'2',  cursor: 'pointer'}}
          onClick={() => {
            setcloseSmallBot(true);
            return;
          }}
        >
          <RxCross2 style={{ width: "20px", height: "20px" }} />
        </div>
      </div>
      <p className="m-0" style={{ fontSize: "16px",  cursor: 'pointer' }}
        onClick={() => {  
         setbot((pre) => (pre === 'bigBot' ? 'smallBot' : 'bigBot'))}}
         >
        {myBot?.welcomeMessage}
      </p>
    </div>
  );
};

export default SmallBot;
