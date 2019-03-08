import React, { useState } from "react"
import cx from "classnames"
import { prefix } from "../../prefix"
import { renderToStaticMarkup } from "react-dom/server"
import { Light as Editor } from "react-syntax-highlighter"
import languageXml from "react-syntax-highlighter/dist/languages/hljs/xml"
import { Spacing, Tab } from "@porsche/ui-kit-react"

// More themes at https://highlightjs.org/static/demo/
import editorTheme from "react-syntax-highlighter/dist/styles/hljs/solarized-dark"

Editor.registerLanguage("xml", languageXml)

import "./example.scss"

export interface ExampleProps {
  noHTML?: boolean
  noTheme?: boolean
}

export const Example: React.FunctionComponent<ExampleProps> = (props) => {
  const [theme, setTheme] = useState("default")
  const [showHTML, setShowHTML] = useState(false)

  const renderClasses = cx(
    prefix("example__render"),
    { [prefix("example__render--light")]: theme === "default" },
    { [prefix("example__render--dark")]: theme === "inverted" }
  )

  const toggleHtmlClasses = cx(prefix("example__info__toggle-html"), {
    [prefix("example__info__toggle-html--open")]: showHTML
  })

  const handleShowHTMLClicked = () => {
    setShowHTML(!showHTML)
  }

  const handleLightClicked = () => {
    setTheme("default")
  }

  const handleDarkClicked = () => {
    setTheme("inverted")
  }

  const panes = [
    { menuItem: "Light", key: "Tab1", active: theme === "default", onClick: () => handleLightClicked() },
    { menuItem: "Dark", key: "Tab2", active: theme === "inverted", onClick: () => handleDarkClicked() }
  ]

  return (
    <React.Fragment>
      <Spacing marginTop={60}>
        <div className={prefix("example")}>
          {props.noTheme !== true && <Tab panes={panes} alignment="left" mini />}
          <div className={renderClasses}>{renderNode(props.children, theme)}</div>
          {props.noHTML !== true && (
            <div className={prefix("example__info")}>
              <button className={toggleHtmlClasses} onClick={handleShowHTMLClicked}>
                {showHTML ? "- HTML" : "+ HTML"}
              </button>
              {showHTML && (
                <div className={prefix("example__info__html")}>
                  <Editor language="xml" style={editorTheme}>
                    {renderHTML(props.children, theme)}
                  </Editor>
                </div>
              )}
            </div>
          )}
        </div>
      </Spacing>
    </React.Fragment>
  )
}

function renderNode(children: React.ReactNode, theme: string) {
  return typeof children === "function" ? children(theme) : children
}

function renderHTML(children: React.ReactNode, theme: string) {
  return formatXml(renderToStaticMarkup(renderNode(children, theme)))
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
