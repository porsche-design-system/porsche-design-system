import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { FlexItem } from "./FlexItem"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface Flex extends React.StatelessComponent<FlexProps> {
    Item: typeof FlexItem
}

export interface FlexProps extends ClassNameProp, ComponentProp {
    /** Defines how the flex items are aligned along the cross axis. Corresponds to the "alignItems" css property. */
    alignCrossAxis?: "start" | "center" | "end" | "baseline" | "stretch"

    /**
     * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "alignMainAxis" aligns individual items along the main axis.
     * Corresponds to the "alignContent" css property.
     */
    alignLines?: "start" | "center" | "end" | "space-around" | "space-between" | "stretch"

    /** Defines how the flex items are aligned along the main axis. Corresponds to the "justifyContent" css property. */
    alignMainAxis?: "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly"

    /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
    direction?: "column-reverse" | "column" | "row-reverse" | "row"

    /** Defines the gap between contained children. The value "grid" sets responsive grid spacings that should be used together with Flex.Item. */
    gap?: 0 | 3 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54 | 60 | "a" | "b" | "c" | "d" | "e" | "f" | "grid"

    /** Defines the flex container display as inline rather than block. */
    inline?: boolean

    /**
     * If set, overflowing elements will wrap to a new line.
     * @default true
     */
    wrap?: "reverse" | boolean

    /** The ability to allow/disallow the flex child to shrink. Sometimes needed to fix IE11 bugs. */
    shrink?: 0 | 1
}

const defaultProps: Partial<FlexProps> = {
    wrap: true
}

const _Flex: React.StatelessComponent<FlexProps> & Partial<Flex> = (props) => {
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
        shrink,
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
        { [prefix(`flex--shrink-${shrink}`)]: shrink !== undefined },
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

/**
 * A flex container component used to create flex box layouts.
 * @see Spacing
 */
export const Flex = _Flex as Flex
