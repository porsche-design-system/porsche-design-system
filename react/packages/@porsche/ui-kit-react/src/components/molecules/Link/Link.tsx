import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { Icon } from "../../atoms/Icon/Icon"

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

    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLElement>} event React's original event.
     * @param {LinkProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLElement>, data: LinkProps) => void
}

const _Link: React.StatelessComponent<LinkProps> = (props) => {
    const { as, className, children, withIcon, onClick, ...rest } = props

    const ElementType = getElementType(as, "a")

    const linkClasses = cx(prefix(withIcon ? "link-icon-text" : "link-text"), className)

    const labelClasses = cx(prefix(withIcon ? "link-icon-text__label" : "link-text__label"), {
        [prefix("link-icon-text__label--black")]: withIcon
    })

    return (
        <ElementType className={linkClasses} onClick={onClick} {...rest}>
            {withIcon && <Icon name="arrow_right_hair" className={prefix("link-icon-text__icon")} />}
            <span className={labelClasses}>{children}</span>
        </ElementType>
    )
}

/**
 * The default Porsche link.
 * @see Icon
 */
export const Link = _Link as React.StatelessComponent<LinkProps>
