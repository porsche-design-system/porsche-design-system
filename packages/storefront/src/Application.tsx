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
import {Home as GeneralHome} from "./pages/general/home/Home"
import {Updates as GeneralUpdates} from "./pages/general/updates/Updates"
import {Roadmap as GeneralRoadmap} from "./pages/general/roadmap/Roadmap"
import {Versioning as GeneralVersioning} from "./pages/general/versioning/Versioning"
import {Support as GeneralSupport} from "./pages/general/support/Support"
import {License as GeneralLicense} from "./pages/general/license/License"
import {FAQ as GeneralFAQ} from "./pages/general/faq/FAQ"
import {Accessibility as GuidelinesAccessibility} from "./pages/guidelines/accessibility/Accessibility"
import {Introduction as DesignIntroduction} from "./pages/design/introduction/Introduction"
import {Contribution as DesignContribution} from "./pages/design/contribution/Contribution"
import {Abstract as DesignAbstract} from "./pages/design/abstract/Abstract"
import {LibraryTemplate as DesignLibraryTemplate} from "./pages/design/library-template/LibraryTemplate"
import {SketchPlugins as DesignSketchPlugins} from "./pages/design/sketch-plugins/SketchPlugins"
import {Introduction as CodeIntroduction} from "./pages/code/introduction/Introduction"
import {DefinitionOfDone as CodeDefinitionOfDone} from "./pages/code/definition-of-done/DefinitionOfDone"
import {CICD as CodeCICD} from "./pages/code/ci-cd/CICD"
import {BrowserCompatibility as CodeBrowserCompatibility} from "./pages/code/browser-compatibility/BrowserCompatibility"
import {Contribution as CodeContribution} from "./pages/code/contribution/Contribution"
import {Markdown} from "./pages/demo/markdown/Markdown"

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
                    <SidebarLink to="/general/home" title="Home"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/general/updates" title="Updates"/>
                    <ul>
                      <li className={prefix("sidebar__nav-item")}>
                        <SidebarLink to="/general/roadmap" title="Roadmap"/>
                      </li>
                      <li className={prefix("sidebar__nav-item")}>
                        <SidebarLink to="/general/versioning" title="Versioning"/>
                      </li>
                    </ul>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/general/support" title="Support"/>
                    <ul>
                      <li className={prefix("sidebar__nav-item")}>
                        <SidebarLink to="/general/faq" title="FAQ"/>
                      </li>
                    </ul>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/general/license" title="License"/>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={prefix("sidebar__category")}>
              <Text type="copy-bold">Guidelines</Text>
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/guidelines/accessibility" title="Accessibility"/>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={prefix("sidebar__category")}>
              <Text type="copy-bold">Designing</Text>
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/design/introduction" title="Introduction"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/design/sketch-plugins" title="Sketch Plugins"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/design/library-template" title="Library Template"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/design/abstract" title="Abstract"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/design/contribution" title="Contribution"/>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={prefix("sidebar__category")}>
              <Text type="copy-bold">Code</Text>
              <nav>
                <ul>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/code/introduction" title="Introduction"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/code/definition-of-done" title="Definition Of Done"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/code/ci-cd" title="CI/CD"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/code/browser-compatibility" title="Browser Compatibility"/>
                  </li>
                  <li className={prefix("sidebar__nav-item")}>
                    <SidebarLink to="/code/contribution" title="Contribution"/>
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
            <Route path="/general/home" component={GeneralHome}/>
            <Route path="/general/updates" component={GeneralUpdates}/>
            <Route path="/general/roadmap" component={GeneralRoadmap}/>
            <Route path="/general/versioning" component={GeneralVersioning}/>
            <Route path="/general/support" component={GeneralSupport}/>
            <Route path="/general/faq" component={GeneralFAQ}/>
            <Route path="/general/license" component={GeneralLicense}/>
            <Route path="/guidelines/accessibility" component={GuidelinesAccessibility}/>
            <Route path="/design/introduction" component={DesignIntroduction}/>
            <Route path="/design/sketch-plugins" component={DesignSketchPlugins}/>
            <Route path="/design/library-template" component={DesignLibraryTemplate}/>
            <Route path="/design/abstract" component={DesignAbstract}/>
            <Route path="/design/contribution" component={DesignContribution}/>
            <Route path="/code/introduction" component={CodeIntroduction}/>
            <Route path="/code/definition-of-done" component={CodeDefinitionOfDone}/>
            <Route path="/code/ci-cd" component={CodeCICD}/>
            <Route path="/code/browser-compatibility" component={CodeBrowserCompatibility}/>
            <Route path="/code/contribution" component={CodeContribution}/>
            <Route path="/demo/markdown" component={Markdown}/>
            <Route path="/:category/:story" component={Story}/>
            <Route path="/" component={() => <Redirect to="/general/home"/>}/>
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  )
}
