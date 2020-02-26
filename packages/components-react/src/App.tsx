import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { LinkPure } from '@porsche-design-system/components-react';
import { Basic } from "./Basic";
import { Action } from "./Action";
import { Feedback } from "./Feedback";
import { Icons } from "./Icons";
import { Layout } from "./Layout";
import { Navigation } from "./Navigation";
import { SystemLog } from "./SystemLog";

const App: React.FC = () => {

  return (
    <Router>
      <div id="app">
        <SystemLog/>
        <Link to="/basic" component={LinkPure}>
          Basic
        </Link>
        <Link to="/action" component={LinkPure}>
          Action
        </Link>
        <Link to="/feedback" component={LinkPure}>
          Feedback
        </Link>
        <Link to="/icon" component={LinkPure}>
          Icon
        </Link>
        <Link to="/layout" component={LinkPure}>
          Layout
        </Link>
        <Link to="/navigation" component={LinkPure}>
          Navigation
        </Link>
        <hr/>
        <Switch>
          <Route path="/basic">
            <Basic/>
          </Route>
          <Route path="/action">
            <Action/>
          </Route>
          <Route path="/feedback">
            <Feedback/>
          </Route>
          <Route path="/icon">
            <Icons/>
          </Route>
          <Route path="/layout">
            <Layout/>
          </Route>
          <Route path="/navigation">
            <Navigation/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
