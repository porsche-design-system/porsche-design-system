import * as React from "react"
import cx from "classnames"

import { ComponentMeta, MetaCategorizable } from "../../../types/MetaCategorizable"
import { getElementType, META, prefix } from "../../../lib"
import { Icon } from "../../.."
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface LinkProps extends ClassNameProp, ComponentProp {
    /**
     * shows the button when 'true'.
     * @default false
     */
    withIcon?: boolean
    /**
     * The optional href of the link.
     */
    href?: string
    /**
     * The target attribute specifies where to open the linked document.
     */
    target?: "_blank" | "_self" | "_parent" | "_top"
    /**
     * Defines the title of a link, which appears to the user as a tooltip.
     */
    title?: string
}

const _meta: ComponentMeta = {
    name: "Link",
    type: META.TYPES.MOLECULE
}

const Link: React.StatelessComponent<LinkProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, children, withIcon, ...rest } = props

    const ElementType = getElementType(as, "a")

    const linkClasses = cx(prefix(withIcon ? "link-icon-text" : "link-text"), className)
    const iconClasses = cx(
        prefix("icon"),
        prefix("icon--arrow_right_hair"), // We explicitly don't use ui-kit-core as it would lead to an inconsistent state
        prefix("link-icon-text__icon")
    )
    const labelClasses = cx(prefix(withIcon ? "link-icon-text__label" : "link-text__label"), {
        [prefix("link-icon-text__label--black")]: withIcon
    })

    return (
        <ElementType className={linkClasses} {...rest}>
            {withIcon && <span className={iconClasses} />}
            <span className={labelClasses}>{children}</span>
        </ElementType>
    )
}

Link._meta = _meta

/**
 * The default Porsche link.
 * @see Icon
 */
export { Link }
