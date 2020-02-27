import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { LinkPure, Text } from '@porsche-design-system/components-react';
import { Basic } from "./pages/Basic";
import { Action } from "./pages/Action";
import { Form } from "./pages/Form";
import { Feedback } from "./pages/Feedback";
import { Icons } from "./pages/Icons";
import { Layout } from "./pages/Layout";
import { Navigation } from "./pages/Navigation";

const App: React.FC = () => {

  return (
    <Router>
      <div id="app">
        <Text>
          <b id="human-readable-browser-name"/>
          <br/>
          <span id="system-log"/>
        </Text>
        <hr/>
        <Link to="/basic" component={LinkPure}>
          Basic
        </Link>
        <Link to="/action" component={LinkPure}>
          Action
        </Link>
        <Link to="/form" component={LinkPure}>
          Form
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
          <Route path="/form">
            <Form/>
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
