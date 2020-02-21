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
        <Link to="/basic">
          <PLinkPure>Basic</PLinkPure>
        </Link>
        <Link to="/action">
          <PLinkPure>Action</PLinkPure>
        </Link>
        <Link to="/feedback">
          <PLinkPure>Feedback</PLinkPure>
        </Link>
        <Link to="/icon">
          <PLinkPure>Icon</PLinkPure>
        </Link>
        <Link to="/layout">
          <PLinkPure>Layout</PLinkPure>
        </Link>
        <Link to="/navigation">
          <PLinkPure>Navigation</PLinkPure>
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
