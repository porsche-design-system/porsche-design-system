import React, { useState } from "react"
import cx from "classnames"
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom"
import { Sidebar, SidebarLink } from "./components/sidebar/Sidebar"
import { Introduction } from "./pages/introduction/Introduction"
import { Story } from "./components/story/Story"
import { prefix } from "./prefix"
import { Spacing, Logo } from "@porsche/ui-kit-react"
import { Text } from "@porscheui/porsche-ui-kit"
import packageJson from "@porscheui/porsche-ui-kit/package.json"
import "./application.scss"

export class Application extends React.Component<{}, { sidebarClose: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = {
      sidebarClose: false
    }
  }

  toggleSidebar = () => {
    this.setState({ sidebarClose: !this.state.sidebarClose })
  }

  render() {
    const appToggleSidebarClasses = cx(prefix("app__toggle-sidebar"), {
      [prefix("app__toggle-sidebar--close")]: this.state.sidebarClose
    })

    const appSidebarClasses = cx(prefix("app__sidebar"), {
      [prefix("app__sidebar--close")]: this.state.sidebarClose
    })

    const appContentClasses = cx(prefix("app__content"), {
      [prefix("app__content--full")]: this.state.sidebarClose
    })
    return (
      <Router>
        <React.Fragment>
          <button className={appToggleSidebarClasses} onClick={() => this.toggleSidebar()}>
            {this.state.sidebarClose ? "+ Show" : "- Hide"}
          </button>
          <div className={appSidebarClasses}>
            <Sidebar>
              <header>
                <Link className={prefix("sidebar__logo")} to="/introduction">
                  <Logo as="span" className={prefix("sidebar__logo-item")} />
                </Link>
                <Spacing marginTop={18}>
                  <Text type="3-bold" align="center" as="h1">
                    Porsche UI Kit
                  </Text>
                  <Text type="small-regular" align="center" as="p">
                    Current Release: v{packageJson.version}
                  </Text>
                </Spacing>
              </header>
              <hr className={prefix("sidebar__hr")} />
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/introduction" title="Introduction" />
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/designing" title="Designing" />
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/coding" title="Coding" />
                  </li>
                </ul>
              </nav>
            </Sidebar>
            <footer className={prefix("app__legal")}>
              <Text type="small-regular">
                © 2019 Dr. Ing. h.c. F. Porsche AG. <Link to="/">Legal notice</Link>. <Link to="/">Imprint</Link>.
                <Link to="/">Cookies</Link>. <Link to="/">License</Link>.
              </Text>
            </footer>
          </div>
          <div className={appContentClasses}>
            <Switch>
              <Route path="/introduction" component={Introduction} />
              <Route path="/designing" component={Introduction} />
              <Route path="/coding" component={Introduction} />
              <Route path="/:category/:story" component={Story} />
              <Route path="/" component={() => <Redirect to="/introduction" />} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    )
  }
}
