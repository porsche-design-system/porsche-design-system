import * as React from "react"
import cx from "classnames"
import { ComponentMeta, MetaCategorizable } from "../../../types/MetaCategorizable"
import { getElementType, META, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface PaginationProps extends ClassNameProp, ComponentProp {
    /** The different tab items */
    items: PaginationItem[]
    /** Controls if the component is displayed with a smaller dimension */
    mini?: boolean
}

export interface PaginationItem {
    /** The unique identifier */
    key: any
    /** Flag that controls which item is current. */
    active?: boolean | (() => boolean)
    /** Callback to handle the click event outside of the component */
    onClick?: (event: React.MouseEvent<HTMLElement>, item: PaginationItem) => void
}

const _meta: ComponentMeta = {
    name: "Pagination",
    type: META.TYPES.MOLECULE
}

const _Pagination: React.StatelessComponent<PaginationProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, items, mini, ...rest } = props

    const ElementType = getElementType(as, "div")
    const classesPagination = cx(prefix("pagination"), className)

    return (
        <ElementType className={classesPagination} {...rest}>
            <span className={cx(prefix("pagination__prev"))} />
            <ul className={cx(prefix("pagination__items"))}>
                {items.map((item) => {
                    return (
                        <li key={item.key} className={cx(prefix("pagination__item"))}>
                            <a
                                className={cx(prefix("pagination__goto"))}
                                onClick={(event) => item.onClick && item.onClick(event, item)}
                            >
                                {item.key}
                            </a>
                        </li>
                    )
                })}
            </ul>
            <a className={cx(prefix("pagination__next"))} href="#" aria-label="Next" />
        </ElementType>
    )
}

_Pagination._meta = _meta

/**
 * The Pagination component is a link list to cycle through pages/views
 */
export const Pagination = _Pagination as React.StatelessComponent<PaginationProps>
