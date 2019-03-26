import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Storefront } from "./Storefront"
import { Vrt } from "./Vrt"

export const Application: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/vrt/:category/:story" component={Vrt} />
        <Route path="/" component={Storefront} />
      </Switch>
    </Router>
  )
}
