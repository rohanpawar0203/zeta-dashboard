import React, { Fragment } from "react";
import { H4, H6, P, UL } from "../../../AbstractElements";

const FormHeader = (props) => {
  const { selected = "", content } = props;
  return (
    <Fragment>
      <div>
        <H4>{selected === "firebase" ? "Sign Up" : "Sign Up With Jwt"}</H4>
        <H6 className="mb-3">{content}</H6>
      </div>
    </Fragment>
  );
};
export default FormHeader;