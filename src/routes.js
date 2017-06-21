import React from 'react';
import Route from 'react-router';
import IndexRoute from 'react-router';
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <Route path="*" component={NotFoundPage}/>
  </Route>  
);

export default routes;
