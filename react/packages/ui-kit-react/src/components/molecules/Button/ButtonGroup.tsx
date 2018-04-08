import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"
import { Flex } from "../../../index"

export interface ButtonGroupProps {
    /** The html element type to render as. */
    as?: string

    /** Primary content. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}
}

const _meta: ComponentMeta = {
    name: "ButtonGroup",
    parent: "Button",
    type: META.TYPES.MOLECULE
}

const _ButtonGroup: React.StatelessComponent<ButtonGroupProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        ...rest
    } = props

    const classes = cx(
        prefix("button-group"),
        className
    )

    return (
        <Flex
            as={as}
            className={classes}
            {...customAttributes}
            {...rest}
        >
            {children}
        </Flex>
    )
}

_ButtonGroup._meta = _meta

/**
 * A button group wrapper for the default button.
 */
export const ButtonGroup = _ButtonGroup as React.StatelessComponent<ButtonGroupProps>
