import React, { useState, useEffect } from "react"
import { throttle } from "throttle-debounce"
import cx from "classnames"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Sidebar } from "../components/sidebar/Sidebar"
import { Story } from "../components/story/Story"
import styles from "./storefront.module.scss"
import { Home as GeneralHome } from "../pages/general/home/Home"
import { Updates as GeneralUpdates } from "../pages/general/updates/Updates"
import { Roadmap as GeneralRoadmap } from "../pages/general/roadmap/Roadmap"
import { Versioning as GeneralVersioning } from "../pages/general/versioning/Versioning"
import { Support as GeneralSupport } from "../pages/general/support/Support"
import { License as GeneralLicense } from "../pages/general/license/License"
import { FAQ as GeneralFAQ } from "../pages/general/faq/FAQ"
import { Accessibility as GuidelinesAccessibility } from "../pages/guidelines/accessibility/Accessibility"
import { Introduction as DesignIntroduction } from "../pages/design/introduction/Introduction"
import { Contribution as DesignContribution } from "../pages/design/contribution/Contribution"
import { Culture as DesignCulture } from "../pages/design/culture/culture"
import { SketchPlugins as DesignSketchPlugins } from "../pages/design/sketch-plugins/SketchPlugins"
import { Introduction as CodeIntroduction } from "../pages/code/introduction/Introduction"
import { DefinitionOfDone as CodeDefinitionOfDone } from "../pages/code/definition-of-done/DefinitionOfDone"
import { CICD as CodeCICD } from "../pages/code/ci-cd/CICD"
import { BrowserCompatibility as CodeBrowserCompatibility } from "../pages/code/browser-compatibility/BrowserCompatibility"
import { Contribution as CodeContribution } from "../pages/code/contribution/Contribution"
import { Markdown } from "../pages/demo/markdown/Markdown"
import { Footer } from "../components/footer/Footer"

export const Storefront: React.FunctionComponent = () => {
  const [hideSidebar, setHideSidebar] = useState(false)
  const [featureShowComponents, setFeatureShowComponents] = useState("")

  const handleHideSidebarClicked = () => {
    setHideSidebar(!hideSidebar)
  }

  const updateIsMobile = () => {
    window.innerWidth < 1320 ? setHideSidebar(hideSidebar === false) : setHideSidebar(hideSidebar === true)
  }

  const appSidebarClasses = cx(styles["area-sidebar"], {
    [styles.close]: hideSidebar
  })

  const appContentClasses = cx(styles["area-content"], {
    [styles.fullscreen]: hideSidebar
  })

  useEffect(() => {
    window.location.search.indexOf("featureComponents") > -1
      ? setFeatureShowComponents("?featureComponents")
      : setFeatureShowComponents("")

    updateIsMobile()

    window.addEventListener(
      "resize",
      throttle(500, () => {
        updateIsMobile()
      })
    )
  }, [])

  return (
    <Router basename={"v1"}>
      <button className={styles["sidebar-toggle"]} onClick={handleHideSidebarClicked}>
        {hideSidebar ? "+ Show" : "- Hide"}
      </button>
      <div className={appSidebarClasses}>
        <Sidebar featureState={featureShowComponents} />
        <Footer />
      </div>
      <main className={appContentClasses}>
        <Switch>
          <Route exact path="/" component={() => <Redirect to={"/general/home" + featureShowComponents} />} />
          <Route path="/general/home" component={GeneralHome} />
          <Route path="/general/updates" component={GeneralUpdates} />
          <Route path="/general/roadmap" component={GeneralRoadmap} />
          <Route path="/general/versioning" component={GeneralVersioning} />
          <Route path="/general/support" component={GeneralSupport} />
          <Route path="/general/faq" component={GeneralFAQ} />
          <Route path="/general/license" component={GeneralLicense} />
          <Route path="/guidelines/accessibility" component={GuidelinesAccessibility} />
          <Route path="/design/introduction" component={DesignIntroduction} />
          <Route path="/design/sketch-plugins" component={DesignSketchPlugins} />
          <Route path="/design/culture" component={DesignCulture} />
          <Route path="/design/contribution" component={DesignContribution} />
          <Route path="/code/introduction" component={CodeIntroduction} />
          <Route path="/code/definition-of-done" component={CodeDefinitionOfDone} />
          <Route path="/code/ci-cd" component={CodeCICD} />
          <Route path="/code/browser-compatibility" component={CodeBrowserCompatibility} />
          <Route path="/code/contribution" component={CodeContribution} />
          <Route path="/demo/markdown" component={Markdown} />
          <Route
            path="/:category/:story"
            render={(props) => <Story featureState={featureShowComponents} {...props} />}
          />
        </Switch>
      </main>
    </Router>
  )
}
