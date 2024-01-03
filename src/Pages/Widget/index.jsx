import React, { Fragment, useEffect } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import WidgetContain from '../../Component/Widget';

const Widget = React.memo((props) => {
  return (
    <Fragment>
      <WidgetContain />
    </Fragment>
  );
});
export default Widget;