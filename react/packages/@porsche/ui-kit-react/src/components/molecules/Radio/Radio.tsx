import * as React from "react"
import cx from "classnames"

import { prefix, getElementType } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { RadioGroup } from "./RadioGroup"

export interface Radio extends React.StatelessComponent<RadioProps> {
    Group: typeof RadioGroup
}

export interface RadioProps extends ClassNameProp, ComponentProp {
    /** A Radio needs a name */
    name?: string

    /**
     * Whether or not the radio is checked.
     */
    checked?: boolean

    /** A radio can appear disabled and be unable to change states. */
    disabled?: boolean

    /** A radio can display an error. */
    error?: boolean

    /**
     * Called when the user attempts to change the selected radio.
     * @param {boolean} value The proposed value after the change.
     * @param {SyntheticEvent} event React's original event.
     * @param {CheckboxProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>, data: RadioProps) => void

    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLElement>} event React's original event.
     * @param {CheckboxProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLElement>, data: RadioProps) => void

    /** Determines if the content is wrapped or truncated with an ellipsis. */
    singleLine?: boolean

    /**
     * Determine if the radio is rendered as HTML label or as span element. Use span if you have use the radio together with other elements in a wrapping label.
     * @default label
     */
    labelAs?: "label" | "span"

    /** A radio can have a value */
    value?: string
}

const defaultProps: Partial<RadioProps> = {
    labelAs: "label"
}

const _Radio: React.StatelessComponent<RadioProps> & Partial<Radio> = (props) => {
    const {
        as,
        checked,
        children,
        className,
        disabled,
        error,
        labelAs,
        name,
        onChange,
        onClick,
        singleLine,
        value,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")
    const ElementLabelType = getElementType(labelAs, as)

    const elementClasses = cx(prefix("radio"), {
        [prefix("radio--disabled")]: disabled,
        [prefix("radio--error")]: error
    })

    const labelClasses = cx(
        prefix("noselect"),
        prefix("radio__label"),
        { [prefix("radio__label--error")]: error },
        { [prefix("radio__label--single-line")]: singleLine }
    )

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (!onChange) {
            return
        }

        onChange(e.currentTarget.value, e, props)
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!onClick) {
            return
        }

        if (disabled) {
            e.preventDefault()
            e.stopPropagation()

            return
        }

        onClick(e, props)
    }

    return (
        <ElementType className={className} onClick={handleClick} {...rest}>
            <ElementLabelType className={elementClasses}>
                <input
                    type="radio"
                    name={name}
                    className={prefix("radio__field")}
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                    value={value}
                />
                <span className={prefix("radio__circle")} />
                {children && React.Children.count(children) > 0 && <span className={labelClasses}>{children}</span>}
            </ElementLabelType>
        </ElementType>
    )
}

_Radio.defaultProps = defaultProps
_Radio.Group = RadioGroup

export const Radio = _Radio as Radio
