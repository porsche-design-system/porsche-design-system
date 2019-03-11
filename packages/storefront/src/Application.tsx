import React, {useState} from "react"
import cx from "classnames"
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom"
import {Sidebar, SidebarLink} from "./components/sidebar/Sidebar"
import {Story} from "./components/story/Story"
import {prefix} from "./prefix"
import {Spacing, Logo} from "@porsche/ui-kit-react"
import {Text} from "@porscheui/porsche-ui-kit"
import packageJson from "@porscheui/porsche-ui-kit/package.json"
import "./application.scss"
import {Home} from "./pages/home/Home"
import {Updates} from "./pages/updates/Updates"
import {Roadmap} from "./pages/roadmap/Roadmap"
import {Versioning} from "./pages/versioning/Versioning"
import {Support} from "./pages/support/Support"
import {License} from "./pages/license/License"
import {FAQ} from "./pages/faq/FAQ"
import {Accessibility} from "./pages/accessibility/Accessibility"
import {DesignIntroduction} from "./pages/design-introduction/DesignIntroduction"
import {ContributeDesign} from "./pages/contribute-design/ContributeDesign"
import {Abstract} from "./pages/abstract/Abstract"
import {LibraryTemplate} from "./pages/library-template/LibraryTemplate"
import {SketchPlugins} from "./pages/sketch-plugins/SketchPlugins"
import {CodeIntroduction} from "./pages/code-introduction/CodeIntroduction"
import {DefinitionOfDone} from "./pages/definition-of-done/DefinitionOfDone"
import {CICDPipeline} from "./pages/ci-cd-pipeline/CICDPipeline"
import {BrowserCompatibility} from "./pages/browser-compatibility/BrowserCompatibility"
import {ContributeCode} from "./pages/contribute-code/ContributeCode"

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
            <Route path="/home" component={Home}/>
            <Route path="/updates" component={Updates}/>
            <Route path="/roadmap" component={Roadmap}/>
            <Route path="/versioning" component={Versioning}/>
            <Route path="/support" component={Support}/>
            <Route path="/faq" component={FAQ}/>
            <Route path="/license" component={License}/>

            <Route path="/accessibility" component={Accessibility}/>

            <Route path="/design-introduction" component={DesignIntroduction}/>
            <Route path="/sketch-plugins" component={SketchPlugins}/>
            <Route path="/library-template" component={LibraryTemplate}/>
            <Route path="/abstract" component={Abstract}/>
            <Route path="/contribute-design" component={ContributeDesign}/>

            <Route path="/code-introduction" component={CodeIntroduction}/>
            <Route path="/definition-of-done" component={DefinitionOfDone}/>
            <Route path="/ci-cd-pipeline" component={CICDPipeline}/>
            <Route path="/browser-compatibility" component={BrowserCompatibility}/>
            <Route path="/contribute-code" component={ContributeCode}/>

            <Route path="/:category/:story" component={Story}/>

            <Route path="/" component={() => <Redirect to="/introduction"/>}/>
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  )
}
