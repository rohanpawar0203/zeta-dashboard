import React, { Fragment } from "react";
import Breadcrumbs from "../../CommonElements/Breadcrumbs";
import ProductsContain from "../../Component/Products";

const Products = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="" title="Products" />
      <ProductsContain />
    </Fragment>
  );
};
export default Products;
