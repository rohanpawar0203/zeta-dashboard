import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import StoreContain from '../../Component/Store';

const Store = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="" title="Store" />
      <StoreContain />
    </Fragment>
  );
};
export default Store;