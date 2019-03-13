import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { createPaginationModel, PaginationModelItem, itemTypes } from "./PaginationHelper"
import { EllipsisItem, PrevItem, PageItem, NextItem } from "./PaginationItems"

export interface PaginationListProps extends ClassNameProp, ComponentProp {
    /** Index of the currently active page. */
    activePage: number
    /** Total number of pages. */
    pageTotal: number
    /** The number of pages between ellipsis. 0 = mobile | 1 = desktop */
    pageRange: 0 | 1
    /** Defines the theming of the pagination. */
    inverted?: boolean
    /** Handle click events. */
    onClick?: (event: React.MouseEvent<HTMLElement>, key: number) => void
}

const _PaginationList: React.StatelessComponent<PaginationListProps> = (props) => {
    const { as, className, activePage, pageTotal, pageRange, inverted, onClick, ...rest } = props

    const ElementType: any = getElementType(as, "nav")
    const classesPagination = cx(prefix("pagination"), { [prefix("pagination--theme-inverted")]: inverted }, className)

    // generate pagination items
    const createPaginationItems = () => {
        const paginationModel = createPaginationModel({
            activePage,
            pageTotal,
            pageRange
        })
        const pageItems: JSX.Element[] = []
        let prevItem
        let nextItem

        paginationModel.forEach((pageModel: PaginationModelItem) => {
            if (pageModel.type === itemTypes.PREVIOUS_PAGE_LINK) {
                prevItem = <PrevItem {...pageModel} onClick={props.onClick} />
            }
            if (pageModel.type === itemTypes.ELLIPSIS) {
                pageItems.push(<EllipsisItem {...pageModel} />)
            }
            if (pageModel.type === itemTypes.PAGE) {
                pageItems.push(<PageItem {...pageModel} onClick={props.onClick} />)
            }
            if (pageModel.type === itemTypes.NEXT_PAGE_LINK) {
                nextItem = <NextItem {...pageModel} onClick={props.onClick} />
            }
        })

        return {
            prevItem,
            pageItems,
            nextItem
        }
    }

    const paginationItems = createPaginationItems()

    return (
        <ElementType className={classesPagination} role="navigation" {...rest}>
            {paginationItems.prevItem}
            <ul className={cx(prefix("pagination__items"))}>{paginationItems.pageItems}</ul>
            {paginationItems.nextItem}
        </ElementType>
    )
}

export const PaginationList = _PaginationList as React.StatelessComponent<PaginationListProps>
