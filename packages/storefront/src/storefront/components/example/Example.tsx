import React from "react"
import { prefix } from "@porscheui/porsche-ui-kit"
import { renderToStaticMarkup } from "react-dom/server"

// import Editor from "react-syntax-highlighter"
// import { github as editorTheme } from "react-syntax-highlighter/dist/styles/hljs"

import { Light as Editor } from "react-syntax-highlighter"
import xml from "react-syntax-highlighter/dist/languages/hljs/xml"
import github from "react-syntax-highlighter/dist/styles/hljs/github"

Editor.registerLanguage("xml", xml)

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
            <Editor language="xml" style={github}>
              {renderHTML(props.children)}
            </Editor>
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
  return formatXml(renderToStaticMarkup(renderNode(children)))
}

function formatXml(xml: string): string {
  let formatted = ""
  const reg = /(>)(<)(\/*)/g
  xml = xml.replace(reg, "$1\r\n$2$3")
  let pad = 0
  xml.split("\r\n").forEach((node, index) => {
    let indent = 0
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) {
        pad -= 1
      }
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1
    } else {
      indent = 0
    }

    let padding = ""
    for (let i = 0; i < pad; i++) {
      padding += "  "
    }

    formatted += padding + node + "\r\n"
    pad += indent
  })

  return formatted
}
