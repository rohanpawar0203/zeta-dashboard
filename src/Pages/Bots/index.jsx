import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import BotsContain from '../../Component/Dash-board';

const Bots = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="" title="Your bots" />
      <BotsContain />
    </Fragment>
  );
};
export default Bots;