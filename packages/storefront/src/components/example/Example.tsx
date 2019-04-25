import React, { useState } from "react";
import cx from "classnames";
import { ClassNameProp } from "../../lib/props";
import { renderToStaticMarkup } from "react-dom/server";
import { Light as Editor } from "react-syntax-highlighter";
import languageXml from "react-syntax-highlighter/dist/languages/hljs/xml";
import { Tab } from "@porsche/ui-kit-react";
import { Spacing, Flex } from "@porscheui/porsche-ui-kit";
import styles from "./example.module.scss";
import "./example.global.scss";
import editorTheme from "react-syntax-highlighter/dist/styles/hljs/solarized-dark";

Editor.registerLanguage("xml", languageXml);

export interface ExampleProps extends ClassNameProp {
  noHTML?: boolean;
  noTheme?: boolean;
  noSCSS?: boolean;
}

const defaultProps: Partial<ExampleProps> = {
  noTheme: true
};

export const Example: React.FunctionComponent<ExampleProps> = (props) => {
  const { className } = props;
  const [theme, setTheme] = useState("default");
  const [showHTML, setShowHTML] = useState(false);
  const [showSCSS, setShowSCSS] = useState(false);

  const renderClasses = cx(styles.render, { [styles.light]: theme === "default" }, { [styles.dark]: theme === "inverted" }, "sg-example-global", className);

  const handleShowClicked = (name: string) => {
    if (name === "html") {
      setShowHTML(!showHTML);
      setShowSCSS(showSCSS === true ? false : false);
    } else if (name === "scss") {
      setShowSCSS(!showSCSS);
      setShowHTML(showHTML === true ? false : false);
    }
  };

  const handleThemeClicked = (name: string) => {
    if (name === "default") {
      setTheme("default");
    } else if (name === "inverted") {
      setTheme("inverted");
    }
  };

  const panes = [
    { menuItem: "Light", key: "Tab1", active: theme === "default", onClick: () => handleThemeClicked("default") },
    { menuItem: "Inverted", key: "Tab2", active: theme === "inverted", onClick: () => handleThemeClicked("inverted") }
  ];

  return (
    <React.Fragment>
      <Spacing marginTop={8}>
        <div className={styles.container}>
          {props.noTheme !== true && <Tab panes={panes} alignment="left" mini divider={false} />}
          <div className={renderClasses}>{renderNode(props.children, theme)}</div>
          {(!props.noHTML || !props.noSCSS) && (
            <React.Fragment>
              <Flex className={styles["toggle-container"]} justifyContent="end">
                {!props.noHTML && (
                  <button
                    className={cx(styles.toggle, {
                      [styles.open]: showHTML
                    })}
                    onClick={() => handleShowClicked("html")}
                  >
                    {showHTML ? "- HTML" : "+ HTML"}
                  </button>
                )}
                {!props.noSCSS && (
                  <button
                    className={cx(styles.toggle, {
                      [styles.open]: showSCSS
                    })}
                    onClick={() => handleShowClicked("scss")}
                  >
                    {showSCSS ? "- SCSS" : "+ SCSS"}
                  </button>
                )}
              </Flex>
              {showHTML && (
                <div className={styles.codeblock}>
                  <Editor language="xml" style={editorTheme}>
                    {renderHTML(props.children, theme)}
                  </Editor>
                </div>
              )}
              {showSCSS && (
                <div className={styles.codeblock}>
                  <Editor language="scss" style={editorTheme}>
                    # SCSS paths coming soon...
                  </Editor>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </Spacing>
    </React.Fragment>
  );
};

Example.defaultProps = defaultProps;

function renderNode(children: React.ReactNode, theme: string) {
  return typeof children === "function" ? children(theme) : children;
}

function renderHTML(children: React.ReactNode, theme: string) {
  return formatXml(renderToStaticMarkup(renderNode(children, theme)));
}

function formatXml(xml: string): string {
  let formatted = "";
  const reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, "$1\r\n$2$3");
  let pad = 0;
  xml.split("\r\n").forEach((node, index) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    let padding = "";
    for (let i = 0; i < pad; i++) {
      padding += "  ";
    }

    formatted += padding + node + "\r\n";
    pad += indent;
  });

  return formatted;
}
