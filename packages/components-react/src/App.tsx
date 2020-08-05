import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PLinkPure as LinkPure, PText as Text, PDivider as Divider } from '@porsche-design-system/components-react';
import { routes } from './routes';
import './App.css';

export const App = (): JSX.Element => {
  return (
    <Router>
      <Text>
        <b id="human-readable-browser-name" />
        <br />
        <span id="system-log" />
      </Text>

      <Divider />

      {routes.map((route) => (
        <Link key={route.path} to={route.path} className="removeLinkStyle">
          <LinkPure>{route.name}</LinkPure>
        </Link>
      ))}

      <Divider />

      <div id="app">
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
};
