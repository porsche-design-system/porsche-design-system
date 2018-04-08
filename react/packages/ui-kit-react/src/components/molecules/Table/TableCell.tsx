import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"

export interface TableCellProps {
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
     * @param {TableCellProps} data The props of the component.
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>, data: TableCellProps) => void
}

const _meta: ComponentMeta = {
    name: "TableCell",
    parent: "Table",
    type: META.TYPES.MOLECULE
}

/**
 * A TableCell.
 */
export class TableCell extends React.PureComponent<TableCellProps> {

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
            <ElementType className={classes} as={as} {...customAttributes} {...rest}>
                {children}
            </ElementType>
        )
    }
}
