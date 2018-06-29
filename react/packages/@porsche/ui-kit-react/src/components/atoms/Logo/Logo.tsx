import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { base64logo } from "../../../lib/base64logo"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface LogoProps extends ClassNameProp, ComponentProp {}

const _meta: ComponentMeta = {
    name: "Logo",
    type: META.TYPES.ATOM
}

const _Logo: React.StatelessComponent<LogoProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, children, ...rest } = props

    const ElementType = getElementType(as, "div")

    return (
        <ElementType className={cx(prefix("logo"), className)} {...rest}>
            <img className={prefix("logo__image")} src={base64logo} alt="Porsche®" />
        </ElementType>
    )
}

_Logo._meta = _meta

/**
 * The famous and loved Porsche Logo, currently available in like one size.
 * @see Header
 */
export const Logo = _Logo as React.StatelessComponent<LogoProps>
