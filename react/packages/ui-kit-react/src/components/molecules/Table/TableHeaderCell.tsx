import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Flex, Icon } from "../../../index"

export interface TableHeaderCellProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /** The relative width of the header. */
    grow?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

    /**
     * Called after a user's click.
     * @param {React.SyntheticEvent<HTMLElement>} event React's original event.
     * @param {TableHeaderCellProps} data The props of the component.
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>, data: TableHeaderCellProps) => void

    /** Displays an arrow for ascending or descending order. */
    sorted?: "ascending" | "descending"
}

const _meta: ComponentMeta = {
    name: "TableHeaderCell",
    parent: "Table",
    type: META.TYPES.MOLECULE
}

/**
 * A TableHeaderCell.
 */
export class TableHeaderCell extends React.PureComponent<TableHeaderCellProps> {

    static _meta: ComponentMeta = _meta

    handleClick = (e: React.SyntheticEvent<HTMLElement>) => {
        if (this.props.onClick) {
            this.props.onClick(e, this.props)
        }
    }

    render(): JSX.Element {
        const {
            as,
            className,
            children,
            customAttributes,
            grow,
            sorted,
            onClick,
            ...rest
        } = this.props

        const ElementType = getElementType(as, "div")

        const classes = cx(
            prefix("table__cell"),
            {[prefix(`table__cell--grow-${grow}`)]: grow},
            {[prefix("table__cell--clickable")]: onClick},
            className
        )

        return (
            <ElementType className={classes} as={as} onClick={this.handleClick} {...customAttributes} {...rest}>
                {sorted === "ascending" && <Icon className={prefix("padding-right--8")} name={"arrow_open_full_up"} />}
                {sorted === "descending" && <Icon className={prefix("padding-right--8")} name={"arrow_open_full_down"} />}
                {children}
            </ElementType>
        )
    }
}
