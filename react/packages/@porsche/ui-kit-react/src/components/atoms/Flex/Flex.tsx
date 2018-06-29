import * as React from "react"
import cx from "classnames"

import { META, getElementType, prefix } from "../../../lib"
import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { FlexItem } from "./FlexItem"
import { SpacingValue } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export type FlexAlignLines = "start" | "center" | "end" | "space-around" | "space-between" | "stretch"
export type FlexCrossAxis = "start" | "center" | "end" | "baseline" | "stretch"
export type FlexDirection = "column-reverse" | "column" | "row-reverse" | "row"
export type FlexMainAxis = "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly"
export type FlexWrap = "reverse" | boolean

export interface Flex extends React.StatelessComponent<FlexProps> {
    Item: typeof FlexItem
}

export interface FlexProps extends ClassNameProp, ComponentProp {
    /** Defines how the flex items are aligned along the cross axis. Corresponds to the "alignItems" css property. */
    alignCrossAxis?: FlexCrossAxis

    /**
     * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "alignMainAxis" aligns individual items along the main axis.
     * Corresponds to the "alignContent" css property.
     */
    alignLines?: FlexAlignLines

    /** Defines how the flex items are aligned along the main axis. Corresponds to the "justifyContent" css property. */
    alignMainAxis?: FlexMainAxis

    /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
    direction?: FlexDirection

    /** Defines the gap between contained children. The value "grid" sets responsive grid spacings that should be used together with Flex.Item. */
    gap?: SpacingValue | "grid"

    /** Defines the flex container display as inline rather than block. */
    inline?: boolean

    /**
     * If set, overflowing elements will wrap to a new line.
     * @default true
     */
    wrap?: FlexWrap
}

const _meta: ComponentMeta = {
    name: "Flex",
    type: META.TYPES.ATOM
}

const defaultProps: Partial<FlexProps> = {
    wrap: true
}

const _Flex: React.StatelessComponent<FlexProps> & Partial<Flex> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        alignCrossAxis,
        alignLines,
        alignMainAxis,
        direction,
        gap,
        inline,
        wrap,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("flex"),
        { [prefix("flex--inline")]: inline },
        { [prefix(`flex--direction-${direction}`)]: direction },
        { [prefix(`flex--main-axis-${alignMainAxis}`)]: alignMainAxis },
        { [prefix(`flex--cross-axis-${alignCrossAxis}`)]: alignCrossAxis },
        { [prefix(`flex--align-lines-${alignLines}`)]: alignLines },
        { [prefix(`m-nl--${gap}`)]: gap && gap !== "grid" },
        { [prefix(`m-nr--${gap}`)]: gap && gap !== "grid" },
        { [prefix(`flex--gap`)]: gap && gap === "grid" },
        { [prefix(`flex--wrap`)]: wrap === true },
        { [prefix(`flex--nowrap`)]: wrap === false },
        { [prefix(`flex--wrap-reverse`)]: wrap === "reverse" },
        className
    )

    let augmentedChildren = children

    if (gap && React.Children.count(children) > 0) {
        augmentedChildren = React.Children.map(children, (child: any) => {
            if (!child) {
                return child
            }

            const { className, ...childRest } = child.props

            return React.cloneElement(child, {
                className: cx(
                    className,
                    { [prefix(`pl--${gap}`)]: gap && gap !== "grid" },
                    { [prefix(`pr--${gap}`)]: gap && gap !== "grid" },
                    { [prefix(`flex__child--gap`)]: gap && gap === "grid" }
                ),
                ...childRest
            })
        })
    }
    return (
        <ElementType className={classes} {...rest}>
            {augmentedChildren}
        </ElementType>
    )
}

_Flex.defaultProps = defaultProps

_Flex.Item = FlexItem

_Flex._meta = _meta

/**
 * A flex container component used to create flex box layouts.
 * @see Spacing
 */
export const Flex = _Flex as Flex
