import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Icon } from "../../../index"
import { IconName } from "../../atoms/Icon/Icon"
import { ButtonGroup } from "./ButtonGroup"

export interface Button extends React.StatelessComponent<ButtonProps> {
    Group: typeof ButtonGroup
}

export interface ButtonProps {
    /** The html element type to render as. */
    as?: string

    /** Primary content. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

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

    /** A button can stretch to fill the full available width. */
    stretch?: boolean

    /**
     * The display type of the button.
     * @default default
     */
    type?: "default" | "black" | "red" | "blue" | "acid-green" | "ghost" | "ghost-inverted"
}

const defaultProps: Partial<ButtonProps> = {
    type: "default",
    icon: "arrow_right_hair"
}

const _meta: ComponentMeta = {
    name: "Button",
    type: META.TYPES.MOLECULE
}

const isGhostButton = (type: string | undefined): boolean => {
    return type === "ghost" || type === "ghost-inverted"
}

const _Button: React.StatelessComponent<ButtonProps> & Partial<Button> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        icon,
        type,
        disabled,
        loading,
        error,
        stretch,
        onClick,
        ...rest
    } = props

    const ElementType = getElementType(as, "button")

    const baseClass = isGhostButton(type) ? "button-ghost" : "button-primary"

    const buttonClasses = cx(
        prefix(`${baseClass}`),
        {[prefix("button-primary--black")]: type === "black"},
        {[prefix("button-primary--red")]: type === "red"},
        {[prefix("button-primary--blue")]: type === "blue"},
        {[prefix("button-primary--acid-green")]: type === "acid-green"},
        {[prefix("button-ghost--inverted")]: type === "ghost-inverted"},
        {[prefix(`${baseClass}--error`)]: error},
        {[prefix(`${baseClass}--stretch`)]: stretch},
        className
    )

    const iconClasses = cx(
        prefix(`${baseClass}__icon`),
        {[prefix(`${baseClass}__icon--loading`)]: loading}
    )

    const loaderClasses = cx(
        prefix(`${baseClass}__loader`),
        "loader-base"
    )

    const labelClasses = cx(
        prefix(`${baseClass}__label`)
    )

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
            type="button"
            onClick={handleClick}
            className={buttonClasses}
            disabled={disabled || loading}
            {...customAttributes}
            {...rest}
        >
            {/* Icon cannot be undefined because of default props */}
            <Icon name={icon as IconName} className={iconClasses}>
                {loading &&
                    <span className={loaderClasses} />
                }
            </Icon>
            <span className={labelClasses}>
                {children}
            </span>
        </ElementType>
    )
}

_Button.defaultProps = defaultProps

_Button.Group = ButtonGroup

_Button._meta = _meta

/**
 * The default Porsche button.
 * @see Icon
 */
export const Button = _Button as Button
