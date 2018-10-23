import * as React from "react"
import cx from "classnames"

import { prefix } from "../../../lib"
import { Flex } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface ButtonGroupProps extends ClassNameProp, ComponentProp {}

const _ButtonGroup: React.StatelessComponent<ButtonGroupProps> = (props) => {
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

/**
 * A button group wrapper for the default button.
 */
export const ButtonGroup = _ButtonGroup as React.StatelessComponent<ButtonGroupProps>
