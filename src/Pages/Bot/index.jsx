import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import BotContain from '../../Component/Bot';

const Bot = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="" title=" Home  " />
      <BotContain />
    </Fragment>
  );
};
export default Bot;