import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Flex, Breakpoint, Navigation, NavigationSection, Logo, Divider } from "../../../index"

export interface HeaderProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /** The navigation sections to be displayed. */
    sections: NavigationSection[]

    /** Callback when the logo is clicked. */
    onLogoClick?: () => void
}

const defaultProps: Partial<HeaderProps> = {
    as: "header"
}

const _meta: ComponentMeta = {
    name: "Header",
    type: META.TYPES.ORGANISM
}

const _Header: React.StatelessComponent<HeaderProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        sections,
        onLogoClick,
        ...rest
    } = props

    const ElementType = getElementType(as, "header")

    const classes = cx(
        prefix("header"),
        className
    )

    return (
        <ElementType
            className={classes}
            {...customAttributes}
            {...rest}
        >
            <Flex alignMainAxis="center">
                <Logo
                    className={cx(
                        {[prefix("header__logo--clickable")]: onLogoClick}
                    )}
                    customAttributes={{ onClick: onLogoClick }}
                />
            </Flex>
            <Divider className={prefix("header__divider")}/>
            <Navigation sections={sections} />
        </ElementType>
    )
}

_Header._meta = _meta

/**
 * The page header with logo and navigation bar
 */
export const Header = _Header
