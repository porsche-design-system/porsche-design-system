import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointCustomizable, mapBreakpointPropToClasses } from "../../../lib"
import { Flex } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface ButtonGroupProps extends ClassNameProp, ComponentProp {
    /** Direction of buttons */
    direction?: BreakpointCustomizable<"horizontal" | "vertical">
}

const defaultProps: Partial<ButtonGroupProps> = {
    direction: "horizontal"
}

const _ButtonGroup: React.StatelessComponent<ButtonGroupProps> = (props) => {
    const { as, className, direction, children, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(prefix("button-group"), mapBreakpointPropToClasses("button-group-", direction), className)

    return (
        <ElementType className={classes} {...rest}>
            {React.Children.map(children, (child, i) => {
                return <React.Fragment key={i}>{child}</React.Fragment>
            })}
        </ElementType>
    )
}

_ButtonGroup.defaultProps = defaultProps

/**
 * A button group wrapper for the default button.
 */
export const ButtonGroup = _ButtonGroup as React.StatelessComponent<ButtonGroupProps>
