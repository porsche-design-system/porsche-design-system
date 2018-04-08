import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"

export interface ScrollProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /**
     * The scroll direction.
     * @default vertical
     */
    direction?: "vertical"
}

const defaultProps: Partial<ScrollProps> = {
    direction: "vertical"
}

const _meta: ComponentMeta = {
    name: "Scroll",
    type: META.TYPES.ATOM
}

const _Scroll: React.StatelessComponent<ScrollProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        direction,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix(`scroll`),
        prefix(`scroll--${direction}`),
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

_Scroll.defaultProps = defaultProps

_Scroll._meta = _meta

/**
 * Use this component any time you want to provide a scrolling section for long content.
 */
export const Scroll = _Scroll as React.StatelessComponent<ScrollProps>
