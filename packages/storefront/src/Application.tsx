import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Sidebar, SidebarLink } from "./components/sidebar/Sidebar"
import { Introduction } from "./pages/introduction/Introduction"
import { Story } from "./components/story/Story"
import { prefix } from "./prefix"
import { Spacing, Logo, Text } from "@porsche/ui-kit-react"
import "./application.scss"

export class Application extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className={prefix("app__sidebar")}>
            <Sidebar>
              <Logo className={prefix("sidebar__logo")} />
              <Spacing marginTop={24}>
                <Text type="3-thin" align="center" as="h1">
                  Porsche UI Kit
                </Text>
              </Spacing>
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
