import React, { Fragment, } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import { GetMenuItemsProps } from '../_helper/MenuItems/MenuItemsProvider';
import Layout from '../Layout/Layout';

const LayoutRoutes = () => {
  const {routesData} = GetMenuItemsProps();
  return (
    <Fragment>
      <Routes>
        {routesData.map(({ path, Component }, i) => (
          <Route key={i} path={path} element={<Layout />}>
            <Route index  element={Component} />
          </Route>
        ))}
        </Routes>
    </Fragment >
  );
};

export default LayoutRoutes;