import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import TicketsContain from '../../Component/Tickets';

const Tickets = () => {
  console.log('Tickets render');
  return (
    <Fragment>
      <TicketsContain />
    </Fragment>
  );
};
export default Tickets;