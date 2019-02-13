import React from "react"
import { prefix } from "@porscheui/porsche-ui-kit"
import { renderToStaticMarkup } from "react-dom/server"
import "./example.scss"

export interface ExampleProps {
  noHTML?: boolean
}

export const Example: React.FunctionComponent<ExampleProps> = (props) => {
  return (
    <div className={prefix("example")}>
      <div className={prefix("example__render")}>{renderNode(props.children)}</div>
      {props.noHTML !== true && (
        <div className={prefix("example__info")}>
          <div className={prefix("example__info__html")}>
            <code>{renderHTML(props.children)}</code>
          </div>
        </div>
      )}
    </div>
  )
}

function renderNode(children: React.ReactNode) {
  return typeof children === "function" ? children() : children
}

function renderHTML(children: React.ReactNode) {
  return renderToStaticMarkup(renderNode(children))
}
