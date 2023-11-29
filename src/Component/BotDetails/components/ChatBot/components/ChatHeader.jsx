import React, { Fragment, useContext } from "react";
import { Media } from "reactstrap";
import { H4, H5 } from "../../../../../AbstractElements";

const ChatHeader = ({ myBot }) => {
  return (
    <Fragment>
      <div
        style={{
          background: myBot?.accentColor,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
        className="w-100 d-flex flex-column align-items-center  text-white p-2"
      >
        <H4 attrH4={{ className: "my-3 fw-bolder" }}>Ulai</H4>
        <img
          src="https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75"
          width={"60px"}
          alt={"ulai bot"}
          height={"60px"}
        />
        <H5 attrH5={{ className: "mt-3 mb-2" }}>Our bot answers instantly</H5>
      </div>
    </Fragment>
  );
};
export default ChatHeader;
