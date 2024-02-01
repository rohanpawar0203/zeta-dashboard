import React, { Fragment } from "react";
import Breadcrumbs from "../../CommonElements/Breadcrumbs";
import PaymentContain from "../../Component/PaymentModeList";

const PaymentModesList = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="" title="Online Payment Modes" />
      <div className="mt-2">
        <PaymentContain />
      </div>
    </Fragment>
  );
};
export default PaymentModesList;
