import React, { Fragment, } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import { GetMenuItemsProps } from '../_helper/MenuItems/MenuItemsProvider';
import Layout from '../Layout/Layout';

const LayoutRoutes = () => {
  const {routesData} = GetMenuItemsProps();
  console.log('routesData ', routesData)
  return (
    <Fragment>
      <Routes>
        {routesData.map(({ path, Component }, i) => (
          <Route element={<Layout />} key={i}>
            <Route path={path} element={Component} />
          </Route>
        ))}
      </Routes>
    </Fragment >
  );
};

export default LayoutRoutes;