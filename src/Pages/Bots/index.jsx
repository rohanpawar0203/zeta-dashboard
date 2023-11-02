import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import BotsContain from '../../Component/Bots';

const Bots = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="" title=" Home  " />
      <BotsContain />
    </Fragment>
  );
};
export default Bots;