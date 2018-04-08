import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Flex } from "../../../index"
import { TableContextMenu } from "./TableContextMenu"
import { TableContextMenuItem } from "./Table"
import { TableCell } from "./TableCell"

export interface TableRowProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /** Adds a context menu to the end of the row for further actions. */
    contextMenuItems?: TableContextMenuItem[]

    /**
     * Called after a user's click.
     * @param {React.SyntheticEvent<HTMLElement>} event React's original event.
     * @param {TableRowProps} data The props of the component.
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>, data: TableRowProps) => void
}

const _meta: ComponentMeta = {
    name: "TableRow",
    parent: "Table",
    type: META.TYPES.MOLECULE
}

/**
 * A TableRow.
 */
export class TableRow extends React.PureComponent<TableRowProps> {

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
            contextMenuItems,
            onClick,
            ...rest
        } = this.props

        const ElementType = getElementType(as, "div")

        const classes = cx(
            prefix("table__row-container"),
            {[prefix("table__row--clickable")]: onClick},
            className
        )

        return (
            <ElementType className={classes} onClick={this.handleClick} {...customAttributes} {...rest}>
                <Flex direction="row" className={prefix("table__row")}>
                    {children}
                </Flex>
                {contextMenuItems && contextMenuItems.length > 0 &&
                    <div className={prefix("table__cell-menu")}>
                        <TableContextMenu items={contextMenuItems}/>
                    </div>
                }
            </ElementType>
        )
    }
}
