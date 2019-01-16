import * as React from "react"
import cx from "classnames"

import { prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Flex } from "../../../index"
import { RadioProps } from "./Radio"

export interface RadioGroupProps extends ClassNameProp, ComponentProp {
    name: string

    /**
     * Called when the user attempts to change the selected radio.
     * @param {string} value The proposed value after the change.
     * @param {SyntheticEvent} event React's original event.
     * @param {CheckboxProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>, data: RadioProps) => void
}

const _RadioGroup: React.StatelessComponent<RadioGroupProps> = (props) => {
    const { as, className, children, name, onChange, ...rest } = props

    const classes = cx(prefix("radio-group"), className)

    return (
        <Flex as={as} className={classes} {...rest}>
            {React.Children.map(children, (child: any, i) => {
                return (
                    <div key={i} className={prefix("radio-group__radio")}>
                        {React.cloneElement(child, { name, onChange })}
                    </div>
                )
            })}
        </Flex>
    )
}

export const RadioGroup = _RadioGroup as React.StatelessComponent<RadioGroupProps>
