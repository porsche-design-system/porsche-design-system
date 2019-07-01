import cx from "classnames"
import * as React from "react"
import { Icon, IconProps } from "../../../index"
import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type DetailedHTMLProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type HTMLInputProps = Omit<DetailedHTMLProps, "className" | "onChange" | "value">

export interface InputProps extends ClassNameProp, ComponentProp, HTMLInputProps {
    /**
     * Basic determines if the placeholder disappears when a value is set or entered,
     * or if it floats above the content.
     * If no placeholder is set, this value has no effect.
     * @default false
     */
    basic?: boolean

    /** An input can display an error. */
    error?: boolean

    /** Displays an icon on the right of the input. */
    icon?: IconProps["name"] | JSX.Element

    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLInputElement>} event React's original event.
     * @param {InputProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>, data: InputProps) => void

    /** Displays a unit on the right of the input. */
    unit?: string

    /** The value of the input. */
    value?: string
}

const defaultProps: Partial<InputProps> = {
    type: "text"
}

const _Input: React.StatelessComponent<InputProps> = (props) => {
    const {
        as,
        className,
        children,
        disabled,
        basic,
        error,
        icon,
        onChange,
        placeholder,
        unit,
        type,
        value,
        ...rest
    } = props

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!onChange || disabled) {
            return
        }

        onChange(event.currentTarget.value, event, props)
    }

    const ElementType = getElementType(as, "div")

    const inputClasses = cx(
        prefix("input__field"),
        { [prefix("input__field--has-value")]: !basic && value && value.length > 0 },
        { [prefix("input__field--error")]: error },
        { [prefix("input__field--number")]: type === "number" },
        { [prefix("input__field--no-label")]: basic || placeholder === undefined },
        { [prefix("input__field--with-icon")]: !!icon }
    )

    const floatingPlaceholderClasses = cx(prefix("input__label"), { [prefix("input__label--with-icon")]: !!icon })

    const iconContainerClasses = cx(prefix("input__icon-container"), {
        [prefix("input__icon-container--error")]: error
    })

    return (
        <ElementType className={className}>
            <label className={prefix("input")}>
                <input
                    className={inputClasses}
                    disabled={disabled}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={true}
                    spellCheck={false}
                    type={type}
                    value={value}
                    {...rest}
                />
                {!basic && <span className={floatingPlaceholderClasses}>{placeholder}</span>}
                {icon && (
                    <div className={iconContainerClasses}>{typeof icon === "string" ? <Icon name={icon} /> : icon}</div>
                )}
                {unit && !icon && <span className={prefix("input__unit")}>{unit}</span>}
                {children}
            </label>
        </ElementType>
    )
}

_Input.defaultProps = defaultProps

/**
 * An Input is a field used to elicit a textual response from a user.
 * @see Icon
 * @see Checkbox
 * @see TextArea
 * @see Select
 */
export const Input = _Input as React.StatelessComponent<InputProps>
