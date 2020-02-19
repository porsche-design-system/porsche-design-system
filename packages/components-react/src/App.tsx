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
      <div>
        <Switch>
          <Route exact path="/home">
            <Home/>
          </Route>
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

function Home(){
  return(

      <div>
        <SystemLog/>
        <Link to="/">
          <PLinkPure href={"/home"}>Home</PLinkPure>
        </Link>
        <Link to="/basic">
          <PLinkPure href={"/basic"}>Basic</PLinkPure>
        </Link>
        <Link to="/action">
          <PLinkPure href={"/action"}>Action</PLinkPure>
        </Link>
        <Link to="/feedback">
          <PLinkPure href={"/feedback"}>Feedback</PLinkPure>
        </Link>
        <Link to="/icon">
          <PLinkPure href={"/icon"}>Icon</PLinkPure>
        </Link>
        <Link to="/layout">
          <PLinkPure href={"/layout"}>Layout</PLinkPure>
        </Link>
        <Link to="/navigation">
          <PLinkPure href={"/navigation"}>Navigation</PLinkPure>
        </Link>
      </div>
  );
}

export default App;
