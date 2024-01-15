import React, { Fragment, useEffect } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import WidgetContain from '../../Component/Widget';

const Widget = React.memo((props) => {
  // console.log('hi')
  return (
    <Fragment>
      <WidgetContain />
    </Fragment>
  );
});
export default Widget;