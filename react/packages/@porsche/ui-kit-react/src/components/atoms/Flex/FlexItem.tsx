import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointValues, mapBreakpointPropToClasses } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface FlexItemProps extends ClassNameProp, ComponentProp {
    /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
    alignCrossAxis?: "start" | "center" | "end" | "baseline" | "stretch"

    /** The width of the column. Can be between 1 and 12, or "auto". You can also supply values for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
    width?: "auto" | number | BreakpointValues<"auto" | number>

    /** The offset of the column. Can be between 0 and 11. You can also supply values for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
    offset?: number | BreakpointValues<number>

    /** The ability to allow/disallow the flex child to shrink. Sometimes needed to fix IE11 bugs. */
    shrink?: 0 | 1
}

const _FlexItem: React.StatelessComponent<FlexItemProps> = (props) => {
    const { as, className, children, alignCrossAxis, offset, width, shrink, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("flex__child"),
        { [prefix(`flex__child--cross-axis-${alignCrossAxis}`)]: alignCrossAxis },
        mapBreakpointPropToClasses("flex__child--", width),
        mapBreakpointPropToClasses("flex__child--offset-", offset),
        { [prefix(`flex__child--shrink-${shrink}`)]: shrink !== undefined },
        className
    )

    return (
        <ElementType className={classes} {...rest}>
            {children}
        </ElementType>
    )
}

/**
 * A child of a flex container.
 */
export const FlexItem = _FlexItem as React.StatelessComponent<FlexItemProps>
