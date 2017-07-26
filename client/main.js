import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import Home from './../imports/components/index';
import Signup from './../imports/components/signup';
import Link from './../imports/linksapi/links';


const privateRoutes = ['/links'];

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/links" component={Link}/>
  </Router>
);

Tracker.autorun(()=>{
  const isAuth = !!Meteor.userId();
  console.log(isAuth);

  const currAdd = browserHistory.getCurrentLocation().pathname;
  const onPrivatePage = privateRoutes.includes(currAdd);

  if(!isAuth && onPrivatePage){
    browserHistory.replace("/");
  }

  if(isAuth && !onPrivatePage){
    browserHistory.replace("/links");
  }
});

Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'));
});
