import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { Icon, IconName, Loader } from "../../../index"
import { ButtonGroup } from "./ButtonGroup"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface Button extends React.StatelessComponent<ButtonProps> {
    Group: typeof ButtonGroup
}

export interface ButtonProps extends ClassNameProp, ComponentProp {
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
    icon?: IconName

    /** Disable the button and show a loading indicator. No onClick will be triggered. */
    loading?: boolean

    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLButtonElement>} event React's original event.
     * @param {ButtonProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void

    /**
     * Shows only the icon by default, and the button content starting from a specific breakpoint
     */
    showContent?: "xs" | "s" | "m" | "l" | "xl"

    /** A button can stretch to fill the full available width. */
    stretch?: boolean

    /** A button can have centered content (icon/text). */
    centered?: boolean

    /**
     * The display type of the button.
     * @default default
     */
    type?: "default" | "black" | "red" | "blue" | "acid-green" | "ghost" | "ghost-inverted"

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

const isGhostButton = (type: string | undefined): boolean => {
    return type === "ghost" || type === "ghost-inverted"
}

const _Button: React.StatelessComponent<ButtonProps> & Partial<Button> = (props) => {
    const {
        as,
        role,
        className,
        children,
        active,
        disabled,
        error,
        icon,
        loading,
        onClick,
        showContent,
        stretch,
        centered,
        type,
        ...rest
    } = props

    const ElementType = getElementType(as, "button")

    let buttonClasses
    let iconClasses
    let loaderClasses
    let labelClasses

    if (isGhostButton(type)) {
        // Ghost button setup
        buttonClasses = cx(
            prefix("button-ghost"),
            { [prefix("button-ghost--inverted")]: type === "ghost-inverted" },
            { [prefix("button-ghost--error")]: error },
            { [prefix("button-ghost--stretch")]: stretch },
            { [prefix("button-ghost--centered")]: centered },
            { [prefix("button-ghost--active")]: active },
            className
        )

        iconClasses = cx(prefix("button-ghost__icon"), { [prefix("button-ghost__icon--loading")]: loading })

        loaderClasses = cx(prefix("button-ghost__loader"))

        labelClasses = cx(prefix("button-ghost__label"), {
            [prefix(`button-ghost__label--show-${showContent}`)]: showContent
        })
    } else {
        // Primary button setup
        buttonClasses = cx(
            prefix("button-primary"),
            { [prefix("button-primary--black")]: type === "black" },
            { [prefix("button-primary--red")]: type === "red" },
            { [prefix("button-primary--blue")]: type === "blue" },
            { [prefix("button-primary--acid-green")]: type === "acid-green" },
            { [prefix("button-primary--error")]: error },
            { [prefix("button-primary--stretch")]: stretch },
            { [prefix("button-primary--centered")]: centered },
            { [prefix("button-primary--active")]: active },

            className
        )

        iconClasses = cx(prefix("button-primary__icon"), { [prefix("button-primary__icon--loading")]: loading })

        loaderClasses = cx(prefix("button-primary__loader"))

        labelClasses = cx(prefix("button-primary__label"), {
            [prefix(`button-primary__label--show-${showContent}`)]: showContent
        })
    }

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
            <Icon name={icon as IconName} className={iconClasses}>
                {loading && <Loader className={loaderClasses} size="small" inverted={type !== "ghost"} />}
            </Icon>
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
