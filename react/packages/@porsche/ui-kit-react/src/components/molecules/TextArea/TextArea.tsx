import * as React from "react"
import cx from "classnames"

import { prefix, getElementType } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { Icon, IconProps } from "../../../index"

export interface TextAreaProps extends ClassNameProp, ComponentProp {
    basic?: boolean
    disabled?: boolean
    autofocus?: boolean
    error?: boolean
    icon?: IconProps["name"]
    maxLength?: number

    /**
     * Sets the html5 name of the input field.
     * The name attribute is used to reference elements in a JavaScript, or to reference form data after a form is submitted.
     */
    name?: string

    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLTextAreaElement>} event React's original event.
     * @param {TextAreaProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void

    placeholder?: string

    /** The number of lines of the text area. */
    rows?: number
    value?: string
}

const defaultProps: Partial<TextAreaProps> = {
    rows: 4
}

const _TextArea: React.StatelessComponent<TextAreaProps> = (props) => {
    const {
        as,
        className,
        children,
        basic,
        disabled,
        autofocus,
        error,
        icon,
        maxLength,
        name,
        onChange,
        placeholder,
        rows,
        value,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const inputFieldClasses = cx(
        prefix("text-area__field"),
        { [prefix("text-area__field--has-value")]: !basic && value && value.length > 0 },
        { [prefix("text-area__field--error")]: !!error },
        { [prefix("text-area__field--no-label")]: basic }
    )

    const renderMaxLength = (max: number) => {
        return (
            <span className={prefix("text-area__max-length")}>
                {(value || "").toString().length}/{max > 0 ? max : 1}
            </span>
        )
    }

    const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        if (disabled) {
            return
        }

        if (!onChange) {
            return
        }

        const result = maxLength
            ? event.currentTarget.value.substring(0, maxLength)
            : event.currentTarget.value.toString()

        onChange(result, event, props)
    }

    return (
        <ElementType className={className} {...rest}>
            <label className={prefix("text-area")}>
                <textarea
                    className={inputFieldClasses}
                    rows={rows}
                    disabled={disabled}
                    autoFocus={autofocus}
                    name={name}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={true}
                    spellCheck={false}
                    value={value}
                />
                {!basic && <span className={prefix("text-area__label")}>{placeholder}</span>}
                {icon && <Icon name={icon} className={prefix("text-area__icon")} />}
                {maxLength && renderMaxLength(maxLength)}
                {children}
            </label>
        </ElementType>
    )
}

_TextArea.defaultProps = defaultProps

/**
 * A TextArea.
 * @see Checkbox
 * @see TextArea
 * @see Input
 * @see Icon
 */
export const TextArea = _TextArea as React.StatelessComponent<TextAreaProps>
