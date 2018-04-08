import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"

export interface CheckboxProps {
    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /** Custom dom attributes for the checkbox element only. */
    checkboxCustomAttributes?: {[key: string]: any}

    /**
     * Whether or not the checkbox is checked.
     * @default checked
     */
    checked?: boolean

    /** A checkbox can appear disabled and be unable to change states. */
    disabled?: boolean

    /** A checkbox can display an error. */
    error?: boolean

    /**
     * Called when the user attempts to change the checked state.
     * @param {boolean} value The proposed value after the change.
     * @param {SyntheticEvent} event React's original event.
     * @param {CheckboxProps} data All props of the component.
     */
    onChange?: (value: boolean, event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void

    /** A checkbox can be read-only and unable to change states. */
    readOnly?: boolean

    /** Determines if the content is wrapped or truncated with an ellipsis */
    singleLine?: boolean

    /**
     * The appearance of the checkbox.
     * @default default
     */
    type?: "default" | "red" | "blue" | "inverted"
}

const defaultProps: Partial<CheckboxProps> = {
    checked: false,
    type: "default"
}

const _meta: ComponentMeta = {
    name: "Checkbox",
    type: META.TYPES.MOLECULE
}

const _Checkbox: React.StatelessComponent<CheckboxProps> & Partial<MetaCategorizable> = (props) => {
    const {
        checked,
        children,
        className,
        customAttributes,
        checkboxCustomAttributes,
        disabled,
        error,
        onChange,
        readOnly,
        singleLine,
        type,
        ...rest
    } = props

    const classes = cx(
        "pui-checkbox",
        className
    )

    const iconClasses = cx(
        prefix("checkbox__icon"),
        prefix("icon"),
        prefix("icon--check"),
        {[prefix("checkbox__icon--default")]: type === "default"},
        {[prefix("checkbox__icon--red")]: type === "red"},
        {[prefix("checkbox__icon--blue")]: type === "blue"},
        {[prefix("checkbox__icon--inverted")]: type === "inverted"}
    )

    const labelClasses = cx(
        prefix("noselect"),
        prefix("checkbox__label"),
        {[prefix("checkbox__label--error")]: error},
        {[prefix("checkbox__label--inverted")]: type === "inverted"},
        {[prefix("checkbox__label--single-line")]: singleLine}
    )

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!onChange) {
            return
        }

        if (disabled || readOnly) {
            e.preventDefault()
            return
        }

        onChange(!checked, e, props)
    }

    return (
        <label
            className={classes}
            {...customAttributes}
            {...rest}
        >
            <input
                className={prefix("checkbox__field")}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleChange}
            />
            <span className={iconClasses} {...checkboxCustomAttributes}/>
            <span className={labelClasses}>
                {children}
            </span>
        </label>
    )
}

_Checkbox.defaultProps = defaultProps

_Checkbox._meta = _meta

/**
 * A checkbox allows a user to select a binary value.
 * @see Icon
 * @see Input
 * @see TextArea
 * @see Select
 */
export const Checkbox = _Checkbox as React.StatelessComponent<CheckboxProps>
