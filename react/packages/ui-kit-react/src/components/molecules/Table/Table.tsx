import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { IconName } from "../../atoms/Icon/Icon"

import { TableHeader } from "./TableHeader"
import { TableHeaderCell } from "./TableHeaderCell"
import { TableBody } from "./TableBody"
import { TableRow } from "./TableRow"
import { TableCell } from "./TableCell"

export interface TableContextMenuItem {
    id: string,
    icon: IconName,
    label: string | JSX.Element,
    onClick: (event: React.SyntheticEvent<HTMLElement>, data: TableContextMenuItem) => void
}

export interface TableProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
    name: "Table",
    type: META.TYPES.MOLECULE
}

/**
 * A Table.
 */
export class Table extends React.PureComponent<TableProps> {

    static Header: typeof TableHeader = TableHeader
    static HeaderCell: typeof TableHeaderCell = TableHeaderCell
    static Body: typeof TableBody = TableBody
    static Row: typeof TableRow = TableRow
    static Cell: typeof TableCell = TableCell

    static _meta: ComponentMeta = _meta

    render(): JSX.Element {
        const {
            as,
            className,
            children,
            customAttributes,
            ...rest
        } = this.props

        const ElementType = getElementType(as, "div")

        const classes = cx(
            prefix("table"),
            className
        )

        return (
            <ElementType className={classes} {...customAttributes} {...rest}>
                {children}
            </ElementType>
        )
    }
}
