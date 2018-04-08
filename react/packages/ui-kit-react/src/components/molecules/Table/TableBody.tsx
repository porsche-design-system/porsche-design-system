import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Flex } from "../../../index"

export interface TableBodyProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
    name: "TableBody",
    parent: "Table",
    type: META.TYPES.MOLECULE
}

/**
 * A TableBody.
 */
export class TableBody extends React.PureComponent<TableBodyProps> {

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
            prefix("table__body"),
            className
        )

        return (
            <Flex direction="column" className={classes} as={as} {...customAttributes} {...rest}>
                {children}
            </Flex>
        )
    }
}
