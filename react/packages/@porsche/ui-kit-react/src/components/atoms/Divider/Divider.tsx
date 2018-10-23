import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface DividerProps extends ClassNameProp, ComponentProp {
    /**
     * Adds predefined top and bottom spacing for more consistent layouting.
     * If this doesn't fit your purpose you can always customize spacings using the Spacing component.
     */
    spacing?: "none" | "small" | "large"
}

const _Divider: React.StatelessComponent<DividerProps> = (props) => {
    const { as, className, children, spacing, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("divider"),
        { [prefix("divider--spacing-small")]: spacing === "small" },
        { [prefix("divider--spacing-large")]: spacing === "large" },
        className
    )

    return (
        <ElementType className={classes} {...rest}>
            <div className={prefix("divider__line")} />
        </ElementType>
    )
}

/**
 * A very basic divider.
 * @see Spacing
 */
export const Divider = _Divider as React.StatelessComponent<DividerProps>
