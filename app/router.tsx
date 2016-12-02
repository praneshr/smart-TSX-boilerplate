import { Redirect, Route, Router, browserHistory } from 'react-router'
import * as React from 'react'
import Intro from './pages/intro'
import Layout from './layout'
import NotFound from './components/not_found/'

export default () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="/base" />
    <Redirect from="/base" to="/base/intro" />
    <Route path="/base" component={Layout}>
      <Route path="intro" component={Intro} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)
