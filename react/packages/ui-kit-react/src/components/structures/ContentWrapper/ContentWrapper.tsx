import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType } from "../../../lib"

export interface ContentWrapperProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /**
     * Render without max width and safe-area.
     * @default false
     */
    raw?: boolean
}

const defaultProps: Partial<ContentWrapperProps> = {
    raw: false
}

const _meta: ComponentMeta = {
  name: "ContentWrapper",
  type: META.TYPES.STRUCTURE
}

const _ContentWrapper: React.StatelessComponent<ContentWrapperProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        customAttributes,
        raw,
        children,
        ...rest
    } = props

    const ElementType = getElementType(as, "section")

    const classes = cx(
        "pui-content-wrapper",
        {["pui-content-wrapper--raw"]: raw},
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

_ContentWrapper.defaultProps = defaultProps

_ContentWrapper._meta = _meta

/**
 * This component is a direct child of "ThemeWrapper" and defines content sections like section, article.
 * It also adds safe area paddings to the left/right and a max-content-width.
 * Direct children of this component may only exist of organisms and molecules.
 */
export const ContentWrapper = _ContentWrapper as React.StatelessComponent<ContentWrapperProps>
