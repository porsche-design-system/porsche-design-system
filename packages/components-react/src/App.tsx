import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { PLinkPure as LinkPure, PText as Text, PDivider as Divider } from '@porsche-design-system/components-react';
import { Basic } from "./pages/Basic";
import { Action } from "./pages/Action";
import { Content } from "./pages/Content";
import { Form } from "./pages/Form";
import { Feedback } from "./pages/Feedback";
import { Icons } from "./pages/Icons";
import { Layout } from "./pages/Layout";
import { Navigation } from "./pages/Navigation";
import './App.css';

const App: React.FC = () => {

  return (
    <Router>
      <div id="app">
        <Text>
          <b id="human-readable-browser-name"/>
          <br/>
          <span id="system-log"/>
        </Text>
        <Divider/>
        <Link to="/basic" className={'removeLinkStyle'} >
          <LinkPure>Basic</LinkPure>
        </Link>
        <Link to="/action" className={'removeLinkStyle'}>
          <LinkPure>Action</LinkPure>
        </Link>
        <Link to="/content" className={'removeLinkStyle'}>
          <LinkPure>Content</LinkPure>
        </Link>
        <Link to="/form" className={'removeLinkStyle'}>
          <LinkPure>Form</LinkPure>
        </Link>
        <Link to="/feedback" className={'removeLinkStyle'}>
          <LinkPure>Feedback</LinkPure>
        </Link>
        <Link to="/icon" className={'removeLinkStyle'}>
          <LinkPure>Icon</LinkPure>
        </Link>
        <Link to="/layout" className={'removeLinkStyle'}>
          <LinkPure>Layout</LinkPure>
        </Link>
        <Link to="/navigation" className={'removeLinkStyle'}>
          <LinkPure>Navigation</LinkPure>
        </Link>
        <Divider/>
        <Switch>
          <Route path="/basic">
            <Basic/>
          </Route>
          <Route path="/action">
            <Action/>
          </Route>
          <Route path="/content">
            <Content/>
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
