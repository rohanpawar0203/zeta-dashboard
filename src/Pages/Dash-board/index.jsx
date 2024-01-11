import React, { Fragment } from "react";
import Breadcrumbs from "../../CommonElements/Breadcrumbs";
import DashboardContain from "../../Component/Dash-board";

const Dashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="" title=" Home  " />
      <DashboardContain />
    </Fragment>
  );
};
export default Dashboard;
