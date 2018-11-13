import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointValues, mapBreakpointPropToClasses } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface FlexItemProps extends ClassNameProp, ComponentProp {
    /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
    alignCrossAxis?:
        | "auto"
        | "start"
        | "center"
        | "end"
        | "baseline"
        | "stretch"
        | BreakpointValues<"auto" | "start" | "center" | "end" | "baseline" | "stretch">

    /** The size of the column. You can also supply values for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
    size?: "auto" | 3 | 4 | 6 | 9 | 12 | BreakpointValues<"auto" | 3 | 4 | 6 | 9 | 12>

    /** The offset of the column. You can also supply values for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
    offset?: 0 | 3 | 4 | 6 | 9 | BreakpointValues<0 | 3 | 4 | 6 | 9>

    /** The ability to allow/disallow the flex child to shrink. */
    shrink?: 0 | 1 | BreakpointValues<0 | 1>

    /** The ability to allow/disallow the flex child to grow. */
    grow?: 0 | 1 | BreakpointValues<0 | 1>

    /** The shorthand property for definincombined behaviour of "shrink", "grow" and "basis" */
    flex?: "initial" | "auto" | "none" | "equal" | BreakpointValues<"initial" | "auto" | "none" | "equal">
}

const _FlexItem: React.StatelessComponent<FlexItemProps> = (props) => {
    const { as, className, children, alignCrossAxis, size, offset, shrink, grow, flex, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("flex__child"),
        mapBreakpointPropToClasses("flex__child--cross-axis", alignCrossAxis),
        mapBreakpointPropToClasses("flex__child--size", size),
        mapBreakpointPropToClasses("flex__child--offset", offset),
        mapBreakpointPropToClasses("flex__child--shrink", shrink),
        mapBreakpointPropToClasses("flex__child--grow", grow),
        mapBreakpointPropToClasses("flex__child-", flex),
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
