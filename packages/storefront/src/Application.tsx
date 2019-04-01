import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Storefront } from "./views/Storefront"
import { Vrt } from "./views/Vrt"

export const Application: React.FunctionComponent = () => {
  return (
    <Router basename={"v1"}>
      <Switch>
        <Route exact path="/vrt/:category/:story" component={Vrt} />
        <Route path="/" component={Storefront} />
      </Switch>
    </Router>
  )
}
