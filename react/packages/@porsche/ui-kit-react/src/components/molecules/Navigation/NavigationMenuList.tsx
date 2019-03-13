import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Flex, Spacing, Text, Icon } from "../../../index"

export interface NavigationMenuListItem {
    key: string
    label: string | JSX.Element
    component?: string | React.ComponentClass<any, any>
    props?: object
}

export interface NavigationMenuListSubmenu {
    key: string
    label?: string | JSX.Element
    items?: NavigationMenuListItem[]
}

export interface NavigationMenuListProps extends ClassNameProp, ComponentProp {
    /** The display type of the list. */
    type?: "default" | "categorized"
    submenu?: NavigationMenuListSubmenu[]
    mobile?: boolean
}

const defaultProps: Partial<NavigationMenuListProps> = {
    type: "default"
}

const _NavigationMenuList: React.StatelessComponent<NavigationMenuListProps> = (props) => {
    const { as, className, children, type, submenu, mobile, ...rest } = props

    const ElementType = getElementType(as, "div")

    const NavigationMenuListClasses = cx(
        prefix("nav-menu-list"),
        { [prefix("nav-menu-list--mobile")]: mobile },
        { [prefix("nav-menu-list--default")]: type === "default" },
        { [prefix("nav-menu-list--category")]: type === "categorized" },
        className
    )

    const renderCategoryTitle = (category: NavigationMenuListSubmenu) => {
        return (
            <Spacing key={category.key} marginBottom={18}>
                <Text type="3-thin" as={"h4"} className={prefix("nav-menu-list__category")}>
                    {category.label}
                </Text>
            </Spacing>
        )
    }

    const renderItems = (items: NavigationMenuListItem[]) => {
        return items.map((item) => {
            const LinkElementType: any = item.component || "a"
            return (
                <Flex.Item as="li" key={item.key} className={prefix("nav-menu-list__item")}>
                    <LinkElementType className={prefix("nav-menu-list__link")} {...item.props}>
                        <Icon name="arrow_right_hair" className={prefix("nav-menu-list__entry-icon")} />
                        <span className={prefix("nav-menu-list__text")}>{item.label}</span>
                    </LinkElementType>
                </Flex.Item>
            )
        })
    }

    return (
        <ElementType className={NavigationMenuListClasses} {...rest}>
            {submenu &&
                submenu.map((category) => {
                    if (type === "categorized" && category.label && category.items) {
                        return (
                            <div key={category.key} className={prefix("nav-menu-list__category-block")}>
                                {renderCategoryTitle(category)}
                                {/* TODO: add responsive grid witdh of 3 to each item */}
                                <Flex as="ul" wrap gap={12} className={prefix("nav-menu-list__list-category")}>
                                    {renderItems(category.items)}
                                </Flex>
                            </div>
                        )
                    } else if (type === "default" && category.items) {
                        return (
                            <Flex
                                key={category.key}
                                as="ul"
                                direction="column"
                                className={prefix("nav-menu-list__list")}
                            >
                                {renderItems(category.items)}
                            </Flex>
                        )
                    } else {
                        return null
                    }
                })}
        </ElementType>
    )
}

_NavigationMenuList.defaultProps = defaultProps

export const NavigationMenuList = _NavigationMenuList
