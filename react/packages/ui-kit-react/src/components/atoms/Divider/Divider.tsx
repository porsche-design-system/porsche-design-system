import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType } from "../../../lib"

export interface DividerProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
    name: "Divider",
    type: META.TYPES.ATOM
}

const _Divider: React.StatelessComponent<DividerProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        "pui-divider",
        className
    )

    return (
        <ElementType
            className={classes}
            {...customAttributes}
            {...rest}
        />
    )
}

_Divider._meta = _meta

/**
 * A very basic divider.
 */
export const Divider = _Divider as React.StatelessComponent<DividerProps>
