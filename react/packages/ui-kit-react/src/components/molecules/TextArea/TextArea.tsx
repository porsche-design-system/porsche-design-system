import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"

import { Icon } from "../../../index"
import { IconName } from "../../atoms/Icon/Icon"

export interface TextAreaProps {
    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    basic?: boolean
    disabled?: boolean
    error?: boolean
    icon?: IconName
    maxLength?: number
    name?: string

    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLTextAreaElement>} event React's original event.
     * @param {TextAreaProps} data All props of the component.
     */
    onChange: (value: string, event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void

    placeholder?: string

    /** The number of lines of the text area. */
    rows?: number
    value?: string
}

const defaultProps: Partial<TextAreaProps> = {
    rows: 4
}

const _meta: ComponentMeta = {
    name: "TextArea",
    type: META.TYPES.MOLECULE
}

const _TextArea: React.StatelessComponent<TextAreaProps> & Partial<MetaCategorizable> = (props) => {
    const {
        className,
        children,
        customAttributes,
        basic,
        disabled,
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

    const labelClasses = cx(
        prefix("text-area"),
        className
    )

    const inputFieldClasses = cx(
        prefix("text-area__field"),
        {[prefix("text-area__field--has-value")]: !basic && value && value.length > 0},
        {[prefix("text-area__field--error")]: !!error},
        {[prefix("text-area__field--no-label")]: basic}
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

        const value = maxLength
            ? event.currentTarget.value.substring(0, maxLength)
            : event.currentTarget.value.toString()

        onChange(value, event, props)
    }

    return (
        <label
            className={labelClasses}
            {...customAttributes}
            {...rest}
        >
            <textarea
                className={inputFieldClasses}
                rows={rows}
                disabled={disabled}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                required={true}
                spellCheck={false}
                value={value}
            />
                {!basic && <span className={prefix("text-area__label")}>{placeholder}</span>}
                {icon && <Icon name={icon} className={prefix("text-area__icon")}/>}
                {maxLength && renderMaxLength(maxLength)}
                {children}
        </label>
    )
}

_TextArea.defaultProps = defaultProps

_TextArea._meta = _meta

/**
 * A TextArea.
 * @see Checkbox
 * @see TextArea
 * @see Input
 * @see Icon
 */
export const TextArea = _TextArea as React.StatelessComponent<TextAreaProps>
