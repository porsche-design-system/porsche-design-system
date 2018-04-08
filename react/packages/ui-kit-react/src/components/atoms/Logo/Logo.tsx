import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { base64logo } from "../../../lib/base64logo"

export interface LogoProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
    name: "Logo",
    type: META.TYPES.ATOM
}

const _Logo: React.StatelessComponent<LogoProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    return (
        <ElementType
            className={cx(
                prefix("logo-protection"),
                className
            )}
            {...customAttributes}
            {...rest}
        >
            <img className="pui-logo-image" src={base64logo} alt="Porsche®" />
        </ElementType>
    )
}

_Logo._meta = _meta

/**
 * The famous and loved Porsche Logo, currently available in like one size.
 */
export const Logo = _Logo as React.StatelessComponent<LogoProps>
