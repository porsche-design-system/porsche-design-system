import React, { useState } from "react"
import cx from "classnames"
import styles from "./exampleVrt.module.scss"

export interface ExampleVrtProps {
  theme: "default" | "inverted"
}

const defaultProps: Partial<ExampleVrtProps> = {
  theme: "default"
}

function renderNode(children: React.ReactNode, theme: string) {
  return typeof children === "function" ? children(theme) : children
}

export const ExampleVrt: React.FunctionComponent<ExampleVrtProps> = (props) => {
  const { theme, ...rest } = props

  const renderClasses = cx(styles.vrt, { [styles.light]: theme === "default" }, { [styles.dark]: theme === "inverted" })

  return (
    <React.Fragment>
      <div className={renderClasses}>{renderNode(props.children, props.theme)}</div>
    </React.Fragment>
  )
}

ExampleVrt.defaultProps = defaultProps
