import * as React from "react"
import cx from "classnames"

import { DOMAttributes } from "react"
import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface FlyoutProps extends ClassNameProp, ComponentProp {
    /**
     * The position of the flyout
     * @default left
     */
    position?: "left" | "right"
}

const defaultProps: Partial<FlyoutProps> = {
    position: "left"
}

const _meta: ComponentMeta = {
    name: "Flyout",
    type: META.TYPES.MOLECULE
}

const _Flyout: React.StatelessComponent<FlyoutProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, position, children, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("flyout"),
        { [prefix("flyout--left")]: position === "left" },
        { [prefix("flyout--right")]: position === "right" },
        className
    )
    return (
        <ElementType className={classes} {...rest}>
            {children}
        </ElementType>
    )
}

_Flyout.defaultProps = defaultProps

_Flyout._meta = _meta

/**
 * A flyout that can contain arbitrary content.
 * Example usage: Container for the desktop navigation menus.
 */
export const Flyout = _Flyout as React.StatelessComponent<FlyoutProps>
