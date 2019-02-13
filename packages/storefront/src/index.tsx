import React from "react"
import ReactDOM from "react-dom"
import "./storefront/styles/index.scss"
import * as serviceWorker from "./storefront/serviceWorker"

import { Application } from "./storefront/Application"

ReactDOM.render(<Application />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
