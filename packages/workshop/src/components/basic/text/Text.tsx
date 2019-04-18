import * as React from "react"
import cx from "classnames"
import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface TextProps extends ClassNameProp, ComponentProp {
  /**
   * The style of the text.
   * @default copy-regular
   */
  type?:
    | "1-regular"
    | "1-thin"
    | "1-bold"
    | "2-regular"
    | "2-thin"
    | "2-bold"
    | "3-regular"
    | "3-thin"
    | "3-bold"
    | "4-regular"
    | "4-thin"
    | "4-bold"
    | "copy-regular"
    | "copy-bold"
    | "small-regular"
    | "small-bold"

  /** The text alignment of the component. */
  align?: "left" | "center" | "right"

  /**
   * Basic text color variations
   * @default black
   */
  color?: "black" | "white" | "red" | "blue"

  /**
   * Adds an ellipsis to a single line of text if it overflows.
   */
  ellipsis?: boolean

  /**
   * Sets the text as display: inline.
   */
  inline?: boolean

  /**
   * Wraps the text, even when it has to break a word.
   * @default true
   */
  wrap?: boolean

  /**
   * Inverts the color for use on darker backgrounds.
   */
  inverted?: boolean
}

const defaultProps: Partial<TextProps> = {
  type: "copy-regular",
  wrap: true
}

/**
 * Use this component any time you want to display plain text anywhere.
 */
export const Text: React.FunctionComponent<TextProps> = (props) => {
  const { as, className, children, ellipsis, align, inline, type, color, wrap, inverted, ...rest } = props

  const ElementType: any = getElementType(as, "p")

  const classes = cx(
    { [prefix(`text--${type}`)]: type },
    { [prefix(`text--align-${align}`)]: align },
    { [prefix(`text--color-${color}`)]: color },
    { [prefix("text--inline")]: inline },
    { [prefix("text--ellipsis")]: ellipsis },
    { [prefix("text--wrap")]: wrap },
    { [prefix("text--theme-inverted")]: inverted },
    className
  )

  return (
    <ElementType className={classes} {...rest}>
      {children}
    </ElementType>
  )
}

Text.defaultProps = defaultProps
