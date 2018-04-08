import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType } from "../../../lib"

export interface AreaWrapperProps {
    /** The html element type to render as. */
    as?: "header" | "footer" | "main" | "aside"

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
    name: "AreaWrapper",
    type: META.TYPES.STRUCTURE
}

const _AreaWrapper: React.StatelessComponent<AreaWrapperProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        "pui-area-wrapper",
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

_AreaWrapper._meta = _meta

/**
 * This component is a direct child of "PageWrapper" component and defines basic content sections like header, footer, main, etc.
 * Direct children of this component may only exist of "ThemeWrapper" components.
 */
export const AreaWrapper = _AreaWrapper as React.StatelessComponent<AreaWrapperProps>
