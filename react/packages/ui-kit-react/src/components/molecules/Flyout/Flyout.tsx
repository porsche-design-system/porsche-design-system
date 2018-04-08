import * as React from "react"
import cx from "classnames"

import { DOMAttributes } from "react"
import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"

export interface FlyoutProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

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
    const {
        as,
        className,
        position,
        children,
        customAttributes,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("flyout"),
        { [prefix("flyout--left")]: position === "left"},
        { [prefix("flyout--right")]: position === "right"},
        className
    )
    return (
        <ElementType
            className={classes}
            {...customAttributes}
            {...rest}
        >
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
