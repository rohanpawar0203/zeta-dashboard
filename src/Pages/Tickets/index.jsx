import React, { Fragment, useEffect } from "react";
import Breadcrumbs from "../../CommonElements/Breadcrumbs";
import TicketsContain from "../../Component/Tickets";

const Tickets = () => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Breadcrumbs parent="" title="Tickets" />
      <TicketsContain />
    </Fragment>
  );
};
export default Tickets;
