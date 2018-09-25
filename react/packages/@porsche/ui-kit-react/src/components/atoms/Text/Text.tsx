import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export type TextType =
    | "1-regular"
    | "1-thin"
    | "2-regular"
    | "2-thin"
    | "3-regular"
    | "3-thin"
    | "4-regular"
    | "4-thin"
    | "5-regular"
    | "5-thin"
    | "copy"
    | "small"
    | "micro"

export type TextColorType =
    | "black"
    | "grey-darker"
    | "grey-dark"
    | "grey"
    | "grey-light"
    | "grey-lighter"
    | "white"
    | "red-1"
    | "red-2"
    | "blue-1"
    | "blue-2"
    | "status-green"
    | "status-yellow"
    | "status-orange"
    | "status-red"

export type TextAlignType = "left" | "center" | "right"

export interface TextProps extends ClassNameProp, ComponentProp {
    /** The text alignment of the component. */
    align?: TextAlignType

    /**
     * The color of the text. By default, the component inherits the color of the surrounding element.
     * @default inherit
     */
    color?: TextColorType

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
    type?: TextType

    /**
     * Wraps the text, even when it has to break a word.
     * @default true
     */
    wrap?: boolean
}

const defaultProps: Partial<TextProps> = {
    type: "copy",
    wrap: true
}

const _meta: ComponentMeta = {
    name: "Text",
    type: META.TYPES.ATOM
}

const _Text: React.StatelessComponent<TextProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, children, ellipsis, align, color, inline, type, wrap, ...rest } = props

    const ElementType = getElementType(as, "p")

    const classes = cx(
        `-${prefix(`text-size-${type}`)}`,
        { [`-${prefix(`text-color-${color}`)}`]: color },
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

_Text._meta = _meta

/**
 * Use this component any time you want to display plain text anywhere.
 */
export const Text = _Text as React.StatelessComponent<TextProps>
