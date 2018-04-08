import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType } from "../../../lib"

export interface PageWrapperProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
  name: "PageWrapper",
  type: META.TYPES.STRUCTURE
}

const _PageWrapper: React.StatelessComponent<PageWrapperProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        "pui-page-wrapper",
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

_PageWrapper._meta = _meta

/**
 * This component must be used as a wrapper of a complete page/view. Direct children may only exist of "AreaWrapper" components.
 */
export const PageWrapper = _PageWrapper as React.StatelessComponent<PageWrapperProps>
