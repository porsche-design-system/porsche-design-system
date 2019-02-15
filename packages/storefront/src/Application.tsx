import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Sidebar, SidebarLink } from "./components/sidebar/Sidebar"
import { Introduction } from "./pages/introduction/Introduction"
import { Story } from "./components/story/Story"
import { prefix } from "@porscheui/porsche-ui-kit"
import "./application.scss"

export class Application extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className={prefix("app__sidebar")}>
            <Sidebar>
              <SidebarLink to="/introduction" title="Introduction" />
            </Sidebar>
          </div>
          <div className={prefix("app__content")}>
            <Switch>
              <Route path="/introduction" component={Introduction} />
              <Route path="/:category/:story" component={Story} />
              <Route path="/" component={() => <Redirect to="/introduction" />} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    )
  }
}
