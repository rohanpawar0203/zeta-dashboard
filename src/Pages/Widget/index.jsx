import React, { Fragment, useRef } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import WidgetContain from '../../Component/Widget';

const Widget = () => {
  return (
    <div className="border border-primary">
    <Fragment>
      <WidgetContain />
    </Fragment>
    </div>
  );
};
export default Widget;