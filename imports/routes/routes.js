import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Session} from 'meteor/session';

import signup from '../UI/Signup';
import Dashboard from '../UI/Dashboard';
import notfound from '../UI/NotFound';
import login from '../UI/Login';


const onEnterNotePages = (nextState) => {
Session.set('selectedNoteId', nextState.params.id);
};
const onLeaveNotePage = () =>{
  Session.set('selectedNoteId', undefined);
}
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnautheticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnautheticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/signup" exact={true} component={signup} privacy="unauth" />
      <Route path="/dashboard" exact={true} component={Dashboard} privacy="auth" />
      <Route path="/dashboard/:id" exact={true} component={Dashboard} privacy="auth" onEnter={onEnterNotePages} onLeave={onLeaveNotePage}/>
      <Route path="/" exact={true} component={login} privacy="unauth" />
      <Route path="*" component={notfound}/>
    </Route>
  </Router>
);
