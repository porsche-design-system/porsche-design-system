import * as React from "react"
import cx from "classnames"
import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface TextProps extends ClassNameProp, ComponentProp {
  /** The text alignment of the component. */
  align?: "left" | "center" | "right"

  /**
   * Adds an ellipsis to a single line of text if it overflows.
   */
  ellipsis?: boolean

  /** Sets the text as display: inline. */
  inline?: boolean

  /**
   * The style of the text.
   * @default copy
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

  /**
   * Wraps the text, even when it has to break a word.
   * @default true
   */
  wrap?: boolean
}

const defaultProps: Partial<TextProps> = {
  type: "copy-regular",
  wrap: true
}

const _Text: React.StatelessComponent<TextProps> = (props) => {
  const { as, className, children, ellipsis, align, inline, type, wrap, ...rest } = props

  const ElementType: any = getElementType(as, "p")

  const classes = cx(
    { [prefix(`text-size-${type}`)]: type },
    { [prefix(`text--align-${align}`)]: align },
    { [prefix("text--inline")]: inline },
    { [prefix("text--ellipsis")]: ellipsis },
    { [prefix("text--wrap")]: wrap },
    className
  )

  return (
    <ElementType className={classes} {...rest}>
      {children}
    </ElementType>
  )
}

_Text.defaultProps = defaultProps

/**
 * Use this component any time you want to display plain text anywhere.
 */
export const Text = _Text as React.StatelessComponent<TextProps>
