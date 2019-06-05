import * as React from "react"
import cx from "classnames"

import { prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Flex } from "../../../index"
import { RadioProps } from "./Radio"

export interface RadioGroupProps extends ClassNameProp, ComponentProp {
    name: string

    vertical?: boolean

    disabled?: boolean

    /**
     * Called when the user attempts to change the selected radio.
     * @param {string} value The proposed value after the change.
     * @param {SyntheticEvent} event React's original event.
     * @param {CheckboxProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>, data: RadioProps) => void
}

const _RadioGroup: React.StatelessComponent<RadioGroupProps> = (props) => {
    const { as, className, children, disabled, name, vertical, onChange, ...rest } = props

    const classes = cx(
        vertical ? `${prefix("radio-group")} ${prefix("radio-group--vertical")}` : prefix("radio-group"),
        className
    )

    return (
        <Flex as={as} className={classes} direction={vertical ? "column" : "row"} {...rest}>
            {React.Children.map(children, (child: React.ReactElement<RadioProps>) => {
                return (
                    <div key={child.props.value} className={prefix("radio-group__radio")}>
                        {disabled === undefined
                            ? React.cloneElement(child, { name, onChange })
                            : React.cloneElement(child, { name, onChange, disabled })}
                    </div>
                )
            })}
        </Flex>
    )
}

export const RadioGroup = _RadioGroup as React.StatelessComponent<RadioGroupProps>
