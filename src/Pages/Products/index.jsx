import React, { Fragment } from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import ProductsContain from '../../Component/Products';

const Products = () => {
  return (
    <Fragment>
      <div className='mt-2'>
      <ProductsContain />
      </div>
    </Fragment>
  );
};
export default Products;