import React, {useState} from "react"
import cx from "classnames"
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom"
import {Sidebar, SidebarLink} from "./components/sidebar/Sidebar"
import {Introduction} from "./pages/introduction/Introduction"
import {Story} from "./components/story/Story"
import {prefix} from "./prefix"
import {Spacing, Logo} from "@porsche/ui-kit-react"
import {Text} from "@porscheui/porsche-ui-kit"
import packageJson from "@porscheui/porsche-ui-kit/package.json"
import "./application.scss"
import {Design} from "./pages/design/Design"

export const Application: React.FunctionComponent = () => {
  const [hideSidebar, sethideSidebar] = useState(false)

  const handleHideSidebarClicked = () => {
    sethideSidebar(!hideSidebar)
  }

  const appToggleSidebarClasses = cx(prefix("app__toggle-sidebar"), {
    [prefix("app__toggle-sidebar--close")]: hideSidebar
  })

  const appSidebarClasses = cx(prefix("app__sidebar"), {
    [prefix("app__sidebar--close")]: hideSidebar
  })

  const appContentClasses = cx(prefix("app__content"), {
    [prefix("app__content--full")]: hideSidebar
  })

  return (
    <Router>
      <React.Fragment>
        <button className={appToggleSidebarClasses} onClick={handleHideSidebarClicked}>
          {hideSidebar ? "+ Show" : "- Hide"}
        </button>
        <div className={appSidebarClasses}>
          <Sidebar>
            <header>
              <Link className={prefix("sidebar__logo")} to="/introduction">
                <Logo as="span" className={prefix("sidebar__logo-item")}/>
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
            <hr className={prefix("sidebar__hr")}/>

            <div className={prefix("sidebar__category")}>
              <Text type="copy-bold">General</Text>
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/home" title="Home"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/updates" title="Updates"/>
                    <ul>
                      <li className={prefix("sidebar__nav-item")}>
                        <SidebarLink to="/roadmap" title="Roadmap"/>
                      </li>
                      <li className={prefix("sidebar__nav-item")}>
                        <SidebarLink to="/versioning" title="Versioning"/>
                      </li>
                    </ul>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/support" title="Support"/>
                    <ul>
                      <li className={prefix("sidebar__nav-item")}>
                        <SidebarLink to="/faq" title="FAQ"/>
                      </li>
                    </ul>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/license" title="License"/>
                  </li>
                </ul>
              </nav>
            </div>

            <div className={prefix("sidebar__category")}>
              <Text type="copy-bold">Guidelines</Text>
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/accessibility" title="Accessibility"/>
                  </li>
                </ul>
              </nav>
            </div>

            <div className={prefix("sidebar__category")}>
              <Text type="copy-bold">Designing</Text>
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/design-introduction" title="Introduction"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/sketch-plugins" title="Sketch Plugins"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/library-template" title="Library Template"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/abstract" title="Abstract"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/contribute-design" title="Contribute Design"/>
                  </li>
                </ul>
              </nav>
            </div>

            <div className={prefix("sidebar__category")}>
              <Text type="copy-bold">Code</Text>
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/code-introduction" title="Introduction"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/definition-of-done" title="Definition Of Done"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/ci-cd-pipeline" title="CI/CD Pipeline"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/browser-compatibility" title="Browser Compatibility"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/contribute-code" title="Contribute Code"/>
                  </li>
                </ul>
              </nav>
            </div>

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
            <Route path="/introduction" component={Introduction}/>
            <Route path="/design" component={Design}/>
            <Route path="/coding" component={Introduction}/>
            <Route path="/:category/:story" component={Story}/>
            <Route path="/" component={() => <Redirect to="/introduction"/>}/>
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  )
}
