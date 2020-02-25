import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {
  PLinkPure
} from '@porsche-design-system/components-react';
import {Basic} from "./Basic";
import {Action} from "./Action";
import {Feedback} from "./Feedback";
import {Icon} from "./Icon";
import {Layout} from "./Layout";
import {Navigation} from "./Navigation";
import {SystemLog} from "./SystemLog";

const App: React.FC = () => {

  return (
    <Router>
      <div id="app">
        <SystemLog/>
        <Link to="/basic" component={PLinkPure}>
         Basic
        </Link>
        <Link to="/action" component={PLinkPure}>
          Action
        </Link>
        <Link to="/feedback" component={PLinkPure}>
          Feedback
        </Link>
        <Link to="/icon" component={PLinkPure}>
          Icon
        </Link>
        <Link to="/layout" component={PLinkPure}>
          Layout
        </Link>
        <Link to="/navigation" component={PLinkPure}>
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
            <Icon/>
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
