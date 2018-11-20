import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { Icon, IconProps, Loader } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface ButtonIconProps extends ClassNameProp, ComponentProp {
    /** Sets the button in its active / selected state. */
    active?: boolean

    /** Disables the button. No onClick will be triggered. */
    disabled?: boolean

    /** A button can show an error. */
    error?: boolean

    /**
     * The icon of the button.
     * @default arrow_right_hair
     */
    icon?: IconProps["name"]

    /** Disable the button and show a loading indicator. No onClick will be triggered. */
    loading?: boolean

    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLButtonElement>} event React's original event.
     * @param {ButtonIconProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonIconProps) => void

    /**
     * The display type of the button.
     * @default default
     */
    type?: "basic" | "highlight" | "sales" | "ghost" | "sales-ghost" | "inverted"

    /**
     * Specifies the HTML Type of the button. If undefined, nothing is set.
     * @default button
     */
    role?: "button" | "submit" | "reset"
}

const defaultProps: Partial<ButtonIconProps> = {
    type: "basic",
    icon: "arrow_right_hair",
    role: "button"
}

const _ButtonIcon: React.StatelessComponent<ButtonIconProps> = (props) => {
    const { as, role, className, children, active, disabled, icon, loading, onClick, type, ...rest } = props

    const ElementType = getElementType(as, "button")

    let buttonClasses
    let iconClasses
    let loaderClasses

    buttonClasses = cx(
        prefix("button-icon"),
        { [prefix("button-icon--highlight")]: type === "highlight" },
        { [prefix("button-icon--sales")]: type === "sales" },
        { [prefix("button-icon--active")]: active },
        className
    )

    iconClasses = cx(prefix("button-icon__icon"))

    loaderClasses = cx(prefix("button-icon__loader"))

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!onClick) {
            return
        }

        if (disabled || loading) {
            e.preventDefault()
            return
        }

        onClick(e, props)
    }

    return (
        <ElementType
            type={role}
            onClick={handleClick}
            className={buttonClasses}
            disabled={disabled || loading}
            {...rest}
        >
            {/* Icon cannot be undefined because of default props */}
            <Icon name={icon as IconProps["name"]} className={iconClasses}>
                {loading && <Loader className={loaderClasses} size="small" inverted={type !== "ghost"} />}
            </Icon>
        </ElementType>
    )
}

_ButtonIcon.defaultProps = defaultProps

/**
 * The default Porsche icon only button.
 * @see Icon
 */
export const ButtonIcon = _ButtonIcon as React.StatelessComponent<ButtonIconProps>
