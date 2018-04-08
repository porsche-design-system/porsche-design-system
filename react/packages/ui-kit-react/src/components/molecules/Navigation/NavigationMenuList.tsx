import * as React from "react"
import * as PropTypes from "prop-types"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Flex, Spacing, Text, Icon } from "../../../index"

export type NavigationMenuListType = "default" | "categorized"

export interface NavigationMenuListItem {
    key: string
    label: string | JSX.Element
    link?: string | (() => void)
}

export interface NavigationMenuListCategory {
    key: string
    label?: string | JSX.Element
    items?: NavigationMenuListItem[]
}

export interface NavigationMenuListProps {
    as?: string
    className?: string
    customAttributes?: {[key: string]: any}

    type?: NavigationMenuListType
    categories?: NavigationMenuListCategory[]
    mobile?: boolean
}

export const propTypes = {
    /** The html element type to render as. */
    as: PropTypes.string,

    /** Additional CSS classes. */
    className: PropTypes.string,

    /** The display type of the list. */
    type: PropTypes.oneOf(["default", "categorized"]),

    contents: PropTypes.array
}

const defaultProps: Partial<NavigationMenuListProps> = {
    type: "default"
}

const _NavigationMenuList: React.StatelessComponent<NavigationMenuListProps> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        type,
        categories,
        mobile,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const NavigationMenuListClasses = cx(
        prefix("nav-menu-list"),
        { [prefix("nav-menu-list--mobile")]: mobile },
        { [prefix("nav-menu-list--default")]: type === "default" },
        { [prefix("nav-menu-list--category")]: type === "categorized" },
        className
    )

    const renderCategoryTitle = (category: NavigationMenuListCategory) => {
        return (
            <Spacing key={category.key} marginBottom={18}>
                <Text type="3-thin" as={"h4"} className={prefix("nav-menu-list__category")}>    {category.label}
                </Text>
            </Spacing>
        )
    }

    const renderItems = (items: NavigationMenuListItem[]) => {
        return items.map((item) => {
            return (
                <Flex.Item
                    as="li"
                    key={item.key}
                    className={prefix("nav-menu-list__item")}
                >
                    <a
                        className={prefix("nav-menu-list__link")}
                        href={typeof item.link === "string" ? item.link : undefined}
                        onClick={typeof item.link === "function" ? item.link : undefined}
                    >
                        <Icon name="arrow_right_hair" className={prefix("nav-menu-list__entry-icon")} />
                        <span className={prefix("nav-menu-list__text")}>
                            {item.label}
                        </span>
                    </a>
                </Flex.Item>
            )
        })
    }

    return (
        <ElementType
            className={NavigationMenuListClasses}
            {...customAttributes}
            {...rest}
        >
            {categories && categories.map((category) => {
                    if (type === "categorized" && category.label && category.items) {
                        return (
                            <div
                                key={category.key}
                                className={prefix("nav-menu-list__category-block")}
                            >
                                {renderCategoryTitle(category)}
                                {/* TODO: add responsive grid witdh of 3 to each item */}
                                <Flex
                                    as="ul"
                                    wrap
                                    gap={12}
                                    className={prefix("nav-menu-list__list-category")}
                                >
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
                })
            }
        </ElementType>
    )
}

_NavigationMenuList.propTypes = propTypes
_NavigationMenuList.defaultProps = defaultProps

export const NavigationMenuList = _NavigationMenuList
