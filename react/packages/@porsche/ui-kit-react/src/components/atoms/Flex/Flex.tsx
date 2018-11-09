import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointValues, mapBreakpointPropToClasses } from "../../../lib"
import { FlexItem } from "./FlexItem"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface Flex extends React.StatelessComponent<FlexProps> {
    Item: typeof FlexItem
}

export interface FlexProps extends ClassNameProp, ComponentProp {
    /**
     * Defines the flex container display as inline rather than block.
     * @default false
     */
    inline?: boolean | BreakpointValues<boolean>

    /**
     * If set, overflowing elements will wrap to a new line.
     * @default true
     */
    wrap?: "reverse" | boolean | BreakpointValues<"reverse" | boolean>

    /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
    direction?:
        | "column-reverse"
        | "column"
        | "row-reverse"
        | "row"
        | BreakpointValues<"column-reverse" | "column" | "row-reverse" | "row">

    /** Defines how the flex items are aligned along the main axis. Corresponds to the "justifyContent" css property. */
    alignMainAxis?:
        | "start"
        | "center"
        | "end"
        | "space-around"
        | "space-between"
        | "space-evenly"
        | BreakpointValues<"start" | "center" | "end" | "space-around" | "space-between" | "space-evenly">

    /** Defines how the flex items are aligned along the cross axis. Corresponds to the "alignItems" css property. */
    alignCrossAxis?:
        | "start"
        | "center"
        | "end"
        | "baseline"
        | "stretch"
        | BreakpointValues<"start" | "center" | "end" | "baseline" | "stretch">

    /**
     * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "alignMainAxis" aligns individual items along the main axis.
     * Corresponds to the "alignContent" css property.
     */
    alignContent?:
        | "start"
        | "center"
        | "end"
        | "space-around"
        | "space-between"
        | "stretch"
        | BreakpointValues<"start" | "center" | "end" | "space-around" | "space-between" | "stretch">

    /** Defines the gap between contained children. The value "grid" sets responsive grid spacings that should be used together with Flex.Item. */
    gap?:
        | 0
        | 3
        | 6
        | 12
        | 18
        | 24
        | 30
        | 36
        | 42
        | 48
        | 54
        | 60
        | "a"
        | "b"
        | "c"
        | "d"
        | "e"
        | "f"
        | BreakpointValues<0 | 3 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54 | 60 | "a" | "b" | "c" | "d" | "e" | "f">
}

const defaultProps: Partial<FlexProps> = {
    wrap: true,
    inline: false
}

const _Flex: React.StatelessComponent<FlexProps> & Partial<Flex> = (props) => {
    const {
        as,
        className,
        children,
        inline,
        wrap,
        direction,
        alignMainAxis,
        alignCrossAxis,
        alignContent,
        gap,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        mapBreakpointPropToClasses("flex", inline, "--inline", ""),
        mapBreakpointPropToClasses("flex--wrap", wrap, "", "-no"),
        mapBreakpointPropToClasses("flex--direction", direction),
        mapBreakpointPropToClasses("flex--main-axis", alignMainAxis),
        mapBreakpointPropToClasses("flex--cross-axis", alignCrossAxis),
        mapBreakpointPropToClasses("flex--align-content", alignContent),
        mapBreakpointPropToClasses("m-nl-", gap),
        mapBreakpointPropToClasses("m-nr-", gap),
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
                className: cx(className, { [prefix(`pl--${gap}`)]: gap }, { [prefix(`pr--${gap}`)]: gap }),
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
