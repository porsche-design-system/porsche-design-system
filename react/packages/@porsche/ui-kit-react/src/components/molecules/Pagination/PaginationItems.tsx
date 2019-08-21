import * as React from "react"
import cx from "classnames"

import { prefix } from "../../../lib"

import { PaginationItemType } from "./PaginationHelper"
import { Icon } from "../../atoms/Icon/Icon"

export interface PaginationItemProps {
    /** The unique identifier. */
    key: number
    /** Number of page that user should navigate to when item is activated. */
    value: number
    /** Highlight current page or disable previous/next page links when user is already on first/last page). */
    isActive: boolean
    /** Type of the pagination item. */
    type: PaginationItemType
    /** Called after a user's click. */
    onClick?: (event: React.MouseEvent<HTMLElement>, page: number) => void
}

/**
 * Previous Page Item
 */
export const PrevItem: React.StatelessComponent<PaginationItemProps> = (props) => {
    const { value, isActive, onClick } = props
    const classesPaginationItem = cx(prefix("pagination__prev"), {
        [prefix("pagination__prev--disabled")]: isActive
    })

    // disable item, since we are on the first page
    if (isActive) {
        return <span className={classesPaginationItem} aria-label="Previous disabled" />
    }

    return (
        <Icon
            as="a"
            name="arrow_left_hair"
            className={classesPaginationItem}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault()
                if (!onClick) {
                    return
                }
                onClick(event, value)
            }}
            aria-label="Previous"
            {...{ href: "#" }}
        />
    )
}

/**
 * Next Page Item
 */
export const NextItem: React.StatelessComponent<PaginationItemProps> = (props) => {
    const { value, isActive, onClick } = props
    const classesPaginationItem = cx(prefix("pagination__next"), {
        [prefix("pagination__next--disabled")]: isActive
    })

    // disable item, since we are on the last page
    if (isActive) {
        return <span className={classesPaginationItem} aria-label="Next disabled" />
    }

    return (
        <Icon
            name="arrow_right_hair"
            className={classesPaginationItem}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault()
                if (!onClick || isActive) {
                    return
                }
                onClick(event, value)
            }}
            aria-label="Next"
            {...{ href: "#" }}
        />
    )
}

/**
 * Page Item
 */
export const PageItem: React.StatelessComponent<PaginationItemProps> = (props) => {
    const { value, onClick, isActive } = props
    const ElementType = isActive ? "span" : "a"
    const classesPaginationItem = cx(prefix("pagination__goto"), {
        [prefix("pagination__goto--current")]: isActive
    })

    return (
        <li className={cx(prefix("pagination__item"))}>
            <ElementType
                className={classesPaginationItem}
                href="#"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.preventDefault()
                    if (!onClick || isActive) {
                        return
                    }
                    onClick(event, value)
                }}
                aria-label={`Goto page ${value}`}
            >
                {value}
            </ElementType>
        </li>
    )
}

/**
 * Ellipsis Item
 */
export const EllipsisItem: React.StatelessComponent<PaginationItemProps> = (props) => {
    return (
        <li className={cx(prefix("pagination__item"))}>
            <span className={cx(prefix("pagination__goto"), prefix("pagination__goto--ellipsis"))} />
        </li>
    )
}
