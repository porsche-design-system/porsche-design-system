import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"
import { Flex, Spacing } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface ButtonGroupProps extends ClassNameProp, ComponentProp {}

const _meta: ComponentMeta = {
    name: "ButtonGroup",
    parent: "Button",
    type: META.TYPES.MOLECULE
}

const _ButtonGroup: React.StatelessComponent<ButtonGroupProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, children, ...rest } = props

    const classes = cx(prefix("button-group"), className)

    return (
        <Flex as={as} className={classes} {...rest}>
            {React.Children.map(children, (child, i) => {
                return (
                    <div key={i} className={prefix("button-group__button")}>
                        {child}
                    </div>
                )
            })}
        </Flex>
    )
}

_ButtonGroup._meta = _meta

/**
 * A button group wrapper for the default button.
 */
export const ButtonGroup = _ButtonGroup as React.StatelessComponent<ButtonGroupProps>
