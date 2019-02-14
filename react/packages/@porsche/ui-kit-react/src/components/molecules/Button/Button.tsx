import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { Icon, IconProps, Loader } from "../../../index"
import { ButtonGroup } from "./ButtonGroup"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface Button extends React.StatelessComponent<ButtonProps> {
    Group: typeof ButtonGroup
}

export interface ButtonProps extends ClassNameProp, ComponentProp {
    /** Disables the button. No onClick will be triggered. */
    disabled?: boolean

    /** Button on dark background */
    inverted?: boolean

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
     * @param {ButtonProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void

    /** A button can stretch to fill the full available width. */
    stretch?: boolean

    /** A button can be displayed with a smaller size */
    small?: boolean

    /**
     * The display type of the button.
     * @default default
     */
    type?: "default" | "ghost" | "highlight" | "sales" | "sales-ghost"

    /**
     * Specifies the HTML Type of the button. If undefined, nothing is set.
     * @default button
     */
    role?: "button" | "submit" | "reset"
}

const defaultProps: Partial<ButtonProps> = {
    type: "default",
    icon: "arrow_right_hair",
    role: "button"
}

const _Button: React.StatelessComponent<ButtonProps> & Partial<Button> = (props) => {
    const {
        as,
        role,
        className,
        children,
        disabled,
        inverted,
        icon,
        loading,
        onClick,
        stretch,
        small,
        type,
        ...rest
    } = props

    const ElementType = getElementType(as, "button")

    let buttonClasses
    let iconClasses
    let loaderClasses
    let labelClasses

    buttonClasses = cx(
        prefix("button-regular"),
        { [prefix("button-regular--ghost")]: type === "ghost" },
        { [prefix("button-regular--highlight")]: type === "highlight" },
        { [prefix("button-regular--sales")]: type === "sales" },
        { [prefix("button-regular--sales-ghost")]: type === "sales-ghost" },
        { [prefix("button-regular--stretch")]: stretch },
        { [prefix("button-regular--theme-inverted")]: inverted },
        { [prefix("button-regular--loading")]: loading },
        { [prefix("button-regular--small")]: small },
        className
    )

    iconClasses = cx(prefix("button-regular__icon"))
    loaderClasses = cx(prefix("button-regular__icon-loader"))
    labelClasses = cx(prefix("button-regular__label"))

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

    const loaderNotInverted = () => {
        return ruleTypeGhost() || ruleTypeSalesGhost() ? false : true
    }
    const ruleTypeGhost = () => {
        return type === "ghost" && !inverted ? true : false
    }
    const ruleTypeSalesGhost = () => {
        return type === "sales-ghost" && !inverted ? true : false
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
            {!loading ? (
                <Icon name={icon as IconProps["name"]} className={iconClasses} />
            ) : (
                <Loader size="x-small" className={loaderClasses} inverted={loaderNotInverted()} />
            )}
            <span className={labelClasses}>{children}</span>
        </ElementType>
    )
}

_Button.defaultProps = defaultProps
_Button.Group = ButtonGroup

/**
 * The default Porsche button.
 * @see Icon
 */
export const Button = _Button as Button
