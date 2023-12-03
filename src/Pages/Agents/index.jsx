import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import AgentsContain from '../../Component/Agents';

const Agents = () => {
  return (
    <Fragment>
      <div className='mt-2'>
      <AgentsContain />
      </div>
    </Fragment>
  );
};
export default Agents;