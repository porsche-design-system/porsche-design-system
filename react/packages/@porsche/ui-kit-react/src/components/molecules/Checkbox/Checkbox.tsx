import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix, getElementType } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface CheckboxProps extends ClassNameProp, ComponentProp {
    /** Custom dom attributes for the checkbox element only. */
    checkboxProps?: { [key: string]: any }

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

    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLElement>} event React's original event.
     * @param {CheckboxProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLElement>, data: CheckboxProps) => void

    /** A checkbox can be read-only and unable to change states. */
    readOnly?: boolean

    /** Determines if the content is wrapped or truncated with an ellipsis. */
    singleLine?: boolean

    /** Determines if the label is rendered as HTML label or as span element. */
    labelRender?: boolean

    /**
     * The appearance of the checkbox.
     * @default default
     */
    type?: "default" | "red" | "blue" | "inverted"
}

const defaultProps: Partial<CheckboxProps> = {
    checked: false,
    labelRender: true,
    type: "default"
}

const _meta: ComponentMeta = {
    name: "Checkbox",
    type: META.TYPES.MOLECULE
}

const _Checkbox: React.StatelessComponent<CheckboxProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        checked,
        children,
        className,
        checkboxProps,
        disabled,
        error,
        onChange,
        onClick,
        readOnly,
        singleLine,
        labelRender,
        type,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")
    const ElementLabelType = getElementType(labelRender ? "label" : "span")

    const iconClasses = cx(
        prefix("checkbox__icon"),
        prefix("icon"),
        prefix("icon--check"),
        { [prefix("checkbox__icon--default")]: type === "default" },
        { [prefix("checkbox__icon--red")]: type === "red" },
        { [prefix("checkbox__icon--blue")]: type === "blue" },
        { [prefix("checkbox__icon--inverted")]: type === "inverted" }
    )

    const labelClasses = cx(
        prefix("noselect"),
        prefix("checkbox__label"),
        { [prefix("checkbox__label--error")]: error },
        { [prefix("checkbox__label--inverted")]: type === "inverted" },
        { [prefix("checkbox__label--single-line")]: singleLine }
    )

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!onChange) {
            return
        }

        if (disabled || readOnly) {
            e.preventDefault()
            e.stopPropagation()
            return
        }

        onChange(!checked, e, props)
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!onClick) {
            return
        }

        if (disabled || readOnly) {
            e.preventDefault()
            e.stopPropagation()
            return
        }

        onClick(e, props)
    }

    return (
        <ElementType className={className} onClick={handleClick} {...rest}>
            <ElementLabelType className={prefix("checkbox")}>
                <input
                    className={prefix("checkbox__field")}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={handleChange}
                />
                <span className={iconClasses} {...checkboxProps} />
                {children && React.Children.count(children) > 0 && <span className={labelClasses}>{children}</span>}
            </ElementLabelType>
        </ElementType>
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
