import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface ScrollProps extends ClassNameProp, ComponentProp {
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
    const { as, className, children, direction, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(prefix(`scroll`), prefix(`scroll--${direction}`), className)

    return (
        <ElementType className={classes} {...rest}>
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
