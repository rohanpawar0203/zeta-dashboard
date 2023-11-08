import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import BotInfo from '../../Component/BotDetails';
import { useParams } from 'react-router-dom';

const BotDetails = () => {
  const {boatId} = useParams();
  return (
    <Fragment>
      <BotInfo boatId={boatId}/>
    </Fragment>
  );
};
export default BotDetails;