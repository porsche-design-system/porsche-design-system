import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Flex } from "../../../index"
import { TableCell } from "./TableCell"

export interface TableHeaderProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
    name: "TableHeader",
    parent: "Table",
    type: META.TYPES.MOLECULE
}

/**
 * A TableHeader.
 */
export class TableHeader extends React.PureComponent<TableHeaderProps> {

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
            prefix("table__header"),
            className
        )

        return (
            <Flex direction="row" className={classes} as={as} {...customAttributes} {...rest}>
                {children}
            </Flex>
        )
    }
}
