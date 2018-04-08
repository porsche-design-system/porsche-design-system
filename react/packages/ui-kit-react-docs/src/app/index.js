import React from "react"
import ReactDOM from "react-dom"

import Router from "./routes"

// Include all used components from semantic but not everything to avoid global style changes on components
import "semantic-ui-css/components/menu.css"
import "semantic-ui-css/components/transition.css"
import "semantic-ui-css/components/icon.css"
import "semantic-ui-css/components/popup.css"
import "semantic-ui-css/components/grid.css"
import "semantic-ui-css/components/header.css"
import "semantic-ui-css/components/list.css"
import "semantic-ui-css/components/divider.css"
import "semantic-ui-css/components/table.css"
import "semantic-ui-css/components/image.css"
import "semantic-ui-css/components/input.css"
import "semantic-ui-css/components/segment.css"

import "@porsche/ui-kit-react"
import "@porsche/ui-kit-react/css/index.css"

// ----------------------------------------
// Rendering
// ----------------------------------------

const mountNode = document.createElement("div")
document.body.appendChild(mountNode)

const render = (App) => { ReactDOM.render(<App />, mountNode) }

render(Router)
