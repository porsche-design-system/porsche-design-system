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
    type?: "ghost"

    /**
     * The inverted variant of the button.
     */
    inverted?: boolean

    /**
     * Specifies the HTML Type of the button. If undefined, nothing is set.
     * @default button
     */
    role?: "button" | "submit" | "reset"
}

const defaultProps: Partial<ButtonIconProps> = {
    icon: "arrow_right_hair",
    role: "button"
}

const _ButtonIcon: React.StatelessComponent<ButtonIconProps> = (props) => {
    const { as, role, className, children, active, disabled, icon, loading, onClick, type, inverted, ...rest } = props

    const ElementType = getElementType(as, "button")

    const buttonClasses = cx(
        prefix("button-icon-square"),
        { [prefix("button-icon-square--ghost")]: type === "ghost" },
        { [prefix("button-icon-square--inverted")]: inverted },
        { [prefix("button-icon-square--active")]: active },
        className
    )
    const iconClasses = cx(prefix("button-icon-square__icon"))
    const loaderClasses = cx(prefix("button-icon-square__loader"))

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
            <Icon size={"medium"} name={icon as IconProps["name"]} className={iconClasses}>
                {loading && <Loader className={loaderClasses} inverted={type !== "ghost"} />}
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
