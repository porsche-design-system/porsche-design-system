import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"

import { Icon } from "../../../index"
import { IconName } from "../../atoms/Icon/Icon"

export interface InputProps {
    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /**
     * Basic determines if the placeholder disappears when a value is set or entered,
     * or if it floats above the content.
     */
    basic?: boolean

    /** An input can appear disabled and be unable to change states. */
    disabled?: boolean

    /** An input can display an error. */
    error?: boolean

    /** Displays an icon on the right of the input. */
    icon?: IconName

    /** Sets the html5 name of the input field. */
    name?: string

    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLInputElement>} event React's original event.
     * @param {InputProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>, data: InputProps) => void

    /** The placeholder of the input. */
    placeholder?: string

    /**
     * The html input type.
     * @default text
     */
    type?: "text" | "password" | "number"

    /** Displays a unit on the right of the input. */
    unit?: string

    /** The value of the input. */
    value?: string
}

const defaultProps: Partial<InputProps> = {
    type: "text"
}

const _meta: ComponentMeta = {
    name: "Input",
    type: META.TYPES.MOLECULE
}

const _Input: React.StatelessComponent<InputProps> & Partial<MetaCategorizable> = (props) => {
    const {
        className,
        children,
        customAttributes,
        basic,
        disabled,
        error,
        icon,
        name,
        onChange,
        placeholder,
        type,
        unit,
        value,
        ...rest
    } = props

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!onChange || disabled) {
            return
        }

        onChange(event.currentTarget.value, event, props)
    }

    const labelClasses = cx(
        prefix("input"),
        className
    )

    const inputClasses = cx(
        prefix("input__field"),
        { [prefix("input__field--has-value")]: !basic && value && value.length > 0 },
        { [prefix("input__field--error")]: error },
        { [prefix("input__field--number")]: type === "number" },
        { [prefix("input__field--no-label")]: basic },
        { [prefix("input__field--with-icon")]: !!icon }
    )

    const floatingPlaceholderClasses = cx(
        prefix("input__label"),
        { [prefix("input__label--with-icon")]: !!icon }
    )

    const iconClasses = cx(
        prefix("input__icon"),
        { [prefix("input__icon--error")]: error }
    )

    return (
        <label
            className={labelClasses}
            {...customAttributes}
            {...rest}
        >
            <input
                className={inputClasses}
                disabled={disabled}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                required={true}
                spellCheck={false}
                type={type}
                value={value}
            />
            {!basic && <span className={floatingPlaceholderClasses}>{placeholder}</span>}
            {icon && <Icon name={icon} className={iconClasses}/>}
            {unit && !icon && <span className={prefix("input__unit")}>{unit}</span>}
            {children}
        </label>
    )
}

_Input.defaultProps = defaultProps

_Input._meta = _meta

/**
 * An Input is a field used to elicit a textual response from a user.
 * @see Icon
 * @see Checkbox
 * @see TextArea
 * @see Select
 */
export const Input = _Input as React.StatelessComponent<InputProps>
