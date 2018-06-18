import * as React from "react"
import cx from "classnames"

import { META, getElementType, prefix, BreakpointValues, mapBreakpointPropToClasses } from "../../../lib"
import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { FlexCrossAxis } from "./Flex"

export interface FlexItemProps extends ClassNameProp, ComponentProp {
    /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
    alignCrossAxis?: FlexCrossAxis

    /** The width of the column. Can be between 1 and 12, or "auto". You can also supply values for specific breakpoints, like {base: "6", l: "3"}. You always need to provide a base value when doing this. */
    width?: string | number | BreakpointValues<string | number>

    /** The offset of the column. Can be between 0 and 11. You can also supply values for specific breakpoints, like {base: "6", l: "3"}. You always need to provide a base value when doing this. */
    offset?: number | BreakpointValues<number>
}

const _meta: ComponentMeta = {
    name: "FlexItem",
    parent: "Flex",
    type: META.TYPES.ATOM
}

const _FlexItem: React.StatelessComponent<FlexItemProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, children, alignCrossAxis, offset, width, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("flex__child"),
        { [prefix(`flex__child--cross-axis-${alignCrossAxis}`)]: alignCrossAxis },
        mapBreakpointPropToClasses("flex__child--", width),
        mapBreakpointPropToClasses("flex__child--offset-", offset),
        className
    )

    return (
        <ElementType className={classes} {...rest}>
            {children}
        </ElementType>
    )
}

_FlexItem._meta = _meta

/**
 * A child of a flex container.
 */
export const FlexItem = _FlexItem as React.StatelessComponent<FlexItemProps>
