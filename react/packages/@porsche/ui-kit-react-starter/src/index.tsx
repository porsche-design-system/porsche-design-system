import * as React from "react"
import * as ReactDOM from "react-dom"

import { Bootstrap } from "./Bootstrap"

function render(App: React.ComponentClass) {
    ReactDOM.render(<App />, document.querySelector("#root"))
}

render(Bootstrap)
