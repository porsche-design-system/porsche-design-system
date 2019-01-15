import * as React from "react"
import cx from "classnames"

import { prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Flex } from "../../../index"

export interface RadioGroupProps extends ClassNameProp, ComponentProp {
    name: string
}

const _RadioGroup: React.StatelessComponent<RadioGroupProps> = (props) => {
    const { as, className, children, name, ...rest } = props

    const classes = cx(prefix("radio-group"), className)

    return (
        <Flex as={as} className={classes} {...rest}>
            {React.Children.map(children, (child: any, i) => {
                return (
                    <div key={i} className={prefix("radio-group__radio")}>
                        {React.cloneElement(child, { name })}
                    </div>
                )
            })}
        </Flex>
    )
}

export const RadioGroup = _RadioGroup as React.StatelessComponent<RadioGroupProps>
