import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointValues, mapBreakpointPropToClasses } from "../../../lib"
import { GridChild } from "./GridChild"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export type GridDirection = "column-reverse" | "column" | "row-reverse" | "row"

export interface Grid extends React.StatelessComponent<GridProps> {
    Item: typeof GridChild
}

export interface GridProps extends ClassNameProp, ComponentProp {
    /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
    direction?: GridDirection | BreakpointValues<GridDirection>

    /** Defines the gap between contained children. The value "grid" sets responsive grid spacings that should be used together with Grid.Child. */
    gap?: "normal" | "zero" | BreakpointValues<"normal" | "zero">
}

const defaultProps: Partial<GridProps> = {
    direction: "row"
}

const _Grid: React.StatelessComponent<GridProps> & Partial<Grid> = (props) => {
    const { as, className, children, direction, gap, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("grid"),
        // { [prefix(`grid--direction-${direction}`)]: direction },
        { [mapBreakpointPropToClasses(`grid--direction-${direction}`, direction)]: direction },
        // { [prefix(`grid--gap-${gap}`)]: gap },
        { [mapBreakpointPropToClasses(`grid--gap-${gap}`, gap)]: gap },
        className
    )

    const augmentedChildren = children

    // if (gap && React.Children.count(children) > 0) {
    //     augmentedChildren = React.Children.map(children, (child: any) => {
    //         if (!child) {
    //             return child
    //         }

    //         const { className, ...childRest } = child.props

    //         return React.cloneElement(child, {
    //             className: cx(
    //                 className,
    //                 { [prefix(`pl--${gap}`)]: gap && gap !== "grid" },
    //                 { [prefix(`pr--${gap}`)]: gap && gap !== "grid" },
    //                 { [prefix(`flex__child--gap`)]: gap && gap === "grid" }
    //             ),
    //             ...childRest
    //         })
    //     })
    // }
    return (
        <ElementType className={classes} {...rest}>
            {augmentedChildren}
        </ElementType>
    )
}

_Grid.defaultProps = defaultProps

_Grid.Item = GridChild

/**
 * A grid container component used to create grid layouts.
 */
export const Grid = _Grid as Grid
