import React, { useState } from "react"
import cx from "classnames"
import { prefix } from "@porscheui/porsche-ui-kit"
import { renderToStaticMarkup } from "react-dom/server"
import { Light as Editor } from "react-syntax-highlighter"
import languageXml from "react-syntax-highlighter/dist/languages/hljs/xml"

// More themes at https://highlightjs.org/static/demo/
import editorTheme from "react-syntax-highlighter/dist/styles/hljs/solarized-dark"

Editor.registerLanguage("xml", languageXml)

import "./example.scss"

export interface ExampleProps {
  noHTML?: boolean
}

export const Example: React.FunctionComponent<ExampleProps> = (props) => {
  const [theme, setTheme] = useState("light")
  const [showHTML, setShowHTML] = useState(false)

  const renderClasses = cx(
    prefix("example__render"),
    { [prefix("example__render--light")]: theme === "light" },
    { [prefix("example__render--dark")]: theme === "dark" }
  )
  const lightButtonClasses = cx(
    prefix("example__themes__button"),
    prefix("example__themes__button--light"),
    { [prefix("example__themes__button--light--active")]: theme === "light" },
    { [prefix("example__themes__button--light--inactive")]: theme !== "light" }
  )

  const darkButtonClasses = cx(
    prefix("example__themes__button"),
    prefix("example__themes__button--dark"),
    { [prefix("example__themes__button--dark--active")]: theme === "dark" },
    { [prefix("example__themes__button--dark--inactive")]: theme !== "dark" }
  )

  const handleShowHTMLClicked = () => {
    setShowHTML(!showHTML)
  }

  const handleLightClicked = () => {
    setTheme("light")
  }

  const handleDarkClicked = () => {
    setTheme("dark")
  }

  return (
    <div className={prefix("example")}>
      <div className={renderClasses}>
        <div className={prefix("example__themes")}>
          <button className={lightButtonClasses} onClick={handleLightClicked}>
            Light
          </button>
          <button className={darkButtonClasses} onClick={handleDarkClicked}>
            Dark
          </button>
        </div>
        {renderNode(props.children, theme)}
      </div>
      {props.noHTML !== true && (
        <div className={prefix("example__info")}>
          <button className={prefix("example__info__toggle-html")} onClick={handleShowHTMLClicked}>
            {showHTML ? "Hide HTML" : "Show HTML"}
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
