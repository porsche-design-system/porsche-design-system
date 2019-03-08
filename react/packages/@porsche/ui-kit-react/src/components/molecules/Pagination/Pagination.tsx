import * as React from "react"

import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { Breakpoint } from "../../../index"

import { PaginationList } from "./PaginationList"
import { getTotalPages, getCurrentActivePage } from "./PaginationHelper"

export interface PaginationProps extends ClassNameProp, ComponentProp {
    /** Index of the currently active page. */
    activePage: number
    /** The total count of items. */
    totalItemsCount: number
    /** The total count of items per page.  */
    itemsPerPage: number
    /** Defines the theming of the pagination. */
    inverted?: boolean
    /** Handle click events. */
    onClick: (event: React.MouseEvent<HTMLElement>, page: number) => void
}

const _Pagination: React.StatelessComponent<PaginationProps> = (props) => {
    const { activePage, totalItemsCount, itemsPerPage, inverted, onClick, ...rest } = props

    const totalPages = getTotalPages(totalItemsCount, itemsPerPage)
    const currentActivePage = getCurrentActivePage(activePage, totalPages)

    return (
        <React.Fragment>
            <Breakpoint maxWidth="s">
                <PaginationList
                    onClick={props.onClick}
                    activePage={currentActivePage}
                    pageTotal={totalPages}
                    pageRange={0}
                    inverted={inverted}
                    {...rest}
                />
            </Breakpoint>
            <Breakpoint minWidth="s">
                <PaginationList
                    onClick={props.onClick}
                    activePage={currentActivePage}
                    pageTotal={totalPages}
                    pageRange={1}
                    inverted={inverted}
                    {...rest}
                />
            </Breakpoint>
        </React.Fragment>
    )
}

/**
 * The Pagination component is a link list to cycle through pages/views
 */
export const Pagination = _Pagination as React.StatelessComponent<PaginationProps>
