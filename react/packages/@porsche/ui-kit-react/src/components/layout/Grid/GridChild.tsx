import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointValues, mapBreakpointPropToClasses } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface GridChildProps extends ClassNameProp, ComponentProp {
    /**
     * The size of the column. Can be between 1 and 12. You can also supply values for specific breakpoints, like {base: "6", l: "3"}. You always need to provide a base value when doing this.
     */
    size:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | BreakpointValues<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>

    /** The offset of the column. Can be between 0 and 11. You can also supply values for specific breakpoints, like {base: "6", l: "3"}. You always need to provide a base value when doing this. */
    offset?:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | BreakpointValues<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11>
}

const _GridChild: React.StatelessComponent<GridChildProps> = (props) => {
    const { as, className, children, offset, size, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("grid__child"),
        mapBreakpointPropToClasses("grid__child--size", size),
        mapBreakpointPropToClasses("grid__child--offset", offset),
        className
    )

    return (
        <ElementType className={classes} {...rest}>
            {children}
        </ElementType>
    )
}

/**
 * A child of a grid container.
 */
export const GridChild = _GridChild as React.StatelessComponent<GridChildProps>
