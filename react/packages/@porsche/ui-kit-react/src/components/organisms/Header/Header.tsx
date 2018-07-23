import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Flex, Navigation, NavigationSection, Logo, Divider } from "../../../index"

export interface HeaderProps extends ClassNameProp, ComponentProp {
    /** The navigation sections to be displayed. */
    sections: NavigationSection[]

    /** The mobile navigation trigger text. */
    title?: string | JSX.Element

    /** The element type of the logo. */
    logoComponent?: string | React.ComponentClass

    /** Custom props of the logo. */
    logoProps?: object
}

const _meta: ComponentMeta = {
    name: "Header",
    type: META.TYPES.ORGANISM
}

const _Header: React.StatelessComponent<HeaderProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, children, sections, title, logoComponent, logoProps, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(prefix("header"), className)

    return (
        <ElementType className={classes} {...rest}>
            <Flex alignMainAxis="center">
                <Logo as={logoComponent} {...logoProps} />
            </Flex>
            <Divider className={prefix("header__divider")} />
            {sections.length > 0 ? <Navigation sections={sections} title={title} /> : null}
        </ElementType>
    )
}

_Header._meta = _meta

/**
 * The page header with logo and navigation bar
 */
export const Header = _Header
