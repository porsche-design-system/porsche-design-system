import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface ContentWrapperProps extends ClassNameProp, ComponentProp {
    /**
     * Render without max width and safe-area.
     * @default false
     */
    raw?: boolean
}

const defaultProps: Partial<ContentWrapperProps> = {
    raw: false
}

const _ContentWrapper: React.StatelessComponent<ContentWrapperProps> = (props) => {
    const { as, className, raw, children, ...rest } = props

    const ElementType = getElementType(as, "section")

    const classes = cx(prefix("content-wrapper"), { [prefix("content-wrapper--raw")]: raw }, className)

    return (
        <ElementType className={classes} {...rest}>
            <div className={prefix("content-wrapper__child")}>{children}</div>
        </ElementType>
    )
}

_ContentWrapper.defaultProps = defaultProps

/**
 * This component is a direct child of "ThemeWrapper" and defines content sections like section, article.
 * It also adds safe area paddings to the left/right and a max-content-width.
 * Direct children of this component may only exist of organisms and molecules.
 */
export const ContentWrapper = _ContentWrapper as React.StatelessComponent<ContentWrapperProps>
