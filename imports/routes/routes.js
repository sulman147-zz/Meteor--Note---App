import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route ,browserHistory } from 'react-router';

import signup from '../UI/Signup';
import Dashboard from '../UI/Dashboard';
import notfound from '../UI/NotFound';
import login from '../UI/Login';

// window.browserHistory = browserHistory;
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard']
const onEnterPublicPages = () => {
  if (Meteor.userId()){
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePages = () => {
  if (!Meteor.userId() ) {
    browserHistory.replace('/');
  }
};
export const onAuthChange=(isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnautheticatedPage =unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isUnautheticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  }else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const routes = (
  <Router history={browserHistory}>
       <Route path="/signup" exact={true} component={signup} onEnter={onEnterPublicPages}/>
       <Route path="/dashboard" exact={true} component={Dashboard} onEnter={onEnterPrivatePages}/>
       <Route path="/" exact={true} component={login} onEnter={onEnterPublicPages}/>
       <Route path="*" component={notfound}/>
  </Router>
);
