import { hot } from "react-hot-loader"

import {
    HashRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom"

import ExternalExampleLayout from "./Components/ExternalExampleLayout"
import DocsLayout from "./Components/DocsLayout"
import DocsRoot from "./Components/DocsRoot"
import Introduction from "./Views/Introduction"
import PageNotFound from "./Views/PageNotFound"
import React from "react"

const RedirectToIntro = () => { return <Redirect to="/introduction" /> }

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/maximize/:kebabCaseName" component={ExternalExampleLayout} />
                <Switch>
                    <DocsLayout exact path="/" render={RedirectToIntro} />
                    <DocsLayout exact path="/introduction" component={Introduction} />
                    <DocsLayout exact path="/:type/:name" component={DocsRoot} />
                    <DocsLayout exact path="/*" component={PageNotFound} />
                </Switch>
            </Switch>
        </HashRouter>
    )
}

export default hot(module)(Router)
