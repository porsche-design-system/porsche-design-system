import React from "react"
import ReactDOM from "react-dom"
import "./storefront/styles/index.scss"
import Introduction from "./storefront/views/introduction/Introduction"
import * as serviceWorker from "./storefront/serviceWorker"

ReactDOM.render(<Introduction />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
