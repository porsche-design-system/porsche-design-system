import * as React from "react"
import cx from "classnames"
import { ComponentMeta, MetaCategorizable } from "../../../types/MetaCategorizable"
import { getElementType, META, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface PaginationProps extends ClassNameProp, ComponentProp {
    key: number
    /** The total number of pages */
    pageTotal: number
    /** The max number of pages */
    pageMax: number
    /** The number of pages before/after ellipsis */
    pageMargin?: number
    /** The number of pages between ellipsis */
    pageRange?: number
    /** Defines the theming of the pagination */
    theme?: "inverted" | undefined
    /** Handle click events */
    onClick?: (event: React.MouseEvent<HTMLElement>, item: this) => void
}

// export interface PaginationItem {
//     /** The unique identifier */
//     key: any
//     /** Flag that controls which item is current. */
//     isCurrent?: boolean
//     /** Callback to handle the click event outside of the component */
//     onClick?: (event: React.MouseEvent<HTMLElement>, item: PaginationItem) => void
// }

const _meta: ComponentMeta = {
    name: "Pagination",
    type: META.TYPES.MOLECULE
}

const defaultProps: Partial<PaginationProps> = {
    theme: undefined,
    pageMax: 7,
    pageMargin: 1,
    pageRange: 3
}

const _Pagination: React.StatelessComponent<PaginationProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, pageTotal, pageMax, pageMargin, pageRange, theme, onClick, ...rest } = props

    const ElementType = getElementType(as, "nav")
    const classesPagination = cx(prefix("pagination"), { [prefix("pagination--theme-inverted")]: theme }, className)

    const goToPrev = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
    }

    const goToNext = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
    }

    const goToCurrent = (event: React.MouseEvent<HTMLElement>, page: number) => {
        event.preventDefault()
        return page
    }

    const createList = () => {
        let index: number
        const itemsNumber = pageTotal >= pageMax ? pageMax : pageTotal
        const items = []
        const classesPaginationGoto = cx(prefix("pagination__goto"))
        for (index = 1; index <= itemsNumber; index++) {
            items.push(
                <li key={index} className={cx(prefix("pagination__item"))}>
                    <a className={classesPaginationGoto} href="#" onClick={(event) => goToCurrent(event, index)}>
                        {index}
                    </a>
                </li>
            )
        }
        return items
    }

    return (
        <ElementType className={classesPagination} {...rest}>
            <a
                className={cx(prefix("pagination__prev"))}
                href="#"
                onClick={(event) => goToPrev(event)}
                aria-label="Previous"
            />
            <ul className={cx(prefix("pagination__items"))}>{createList()}</ul>
            <a
                className={cx(prefix("pagination__next"))}
                href="#"
                onClick={(event) => goToNext(event)}
                aria-label="Next"
            />
        </ElementType>
    )
}

_Pagination._meta = _meta
_Pagination.defaultProps = defaultProps

/**
 * The Pagination component is a link list to cycle through pages/views
 */
export const Pagination = _Pagination as React.StatelessComponent<PaginationProps>
