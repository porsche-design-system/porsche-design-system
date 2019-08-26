import * as React from "react"
import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import cx from "classnames"
import { icons as defaultIcons } from "./icons"
import SVGLoader from "react-inlinesvg"

export interface IconProps extends ClassNameProp, ComponentProp {
    /** The icon name that should be used, or a path to a custom svg file. */
    name: string

    /**
     * The size of the icon.
     * @default regular
     */
    size?: "small" | "regular" | "medium" | "large" | "huge"

    /**
     * The style of the color.
     * @default black
     */
    color?:
        | "black"
        | "grey-darker"
        | "grey-dark"
        | "grey"
        | "grey-light"
        | "grey-lighter"
        | "white"
        | "red-1"
        | "red-2"
        | "blue-1"
        | "blue-2"
        | "status-green"
        | "status-yellow"
        | "status-orange"
        | "status-red"

    /**
     * The icon color when the user hovers over it. Since SVG won't support inherited text colors, you need to set this explicitly.
     */
    hoverColor?:
        | "black"
        | "grey-darker"
        | "grey-dark"
        | "grey"
        | "grey-light"
        | "grey-lighter"
        | "white"
        | "red-1"
        | "red-2"
        | "blue-1"
        | "blue-2"
        | "status-green"
        | "status-yellow"
        | "status-orange"
        | "status-red"

    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLButtonElement>} event React's original event.
     * @param {ButtonIconProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLElement>, data: IconProps) => void

    /**
     * Puts a circle around the icon
     */
    circled?: boolean

    /**
     * Adds a native HTML tooltip to the icon
     */
    title?: string

    /** Disables the button. No onClick will be triggered. */
    disabled?: boolean
}

export interface Icon extends React.FunctionComponent<IconProps> {
    /**
     * Names of the available default icons and additionally registered icons.
     */
    names: string[]
}

const defaultProps: Partial<IconProps> = {
    size: "regular"
}

const _Icon: React.FunctionComponent<IconProps> & Partial<Icon> = (props) => {
    const { name, className, color, hoverColor, disabled, onClick, ...iconRest } = props

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!onClick) {
            return
        }

        if (disabled) {
            e.preventDefault()
            return
        }

        onClick(e, props)
    }

    const { as, children, size, circled, ...rest } = iconRest

    const ElementType = getElementType(as, "i")
    const src = (defaultIcons as any)[name] || name

    if (!src) {
        return null
    }

    const classes = cx(
        prefix("icon"),
        prefix(`icon--${size}`),
        { [prefix(`icon--${color}`)]: color !== undefined },
        { [prefix(`icon--${hoverColor}--hover`)]: !disabled && hoverColor !== undefined },
        { [prefix("icon--circled")]: circled },
        { [prefix(`icon--link`)]: !!onClick && !disabled },
        className
    )

    return (
        <ElementType {...rest} onClick={handleClick} className={classes}>
            {/* Skip svg loading in environments without fetch (like jest) */}
            {window.fetch && <SVGLoader src={src} />}
        </ElementType>
    )
}

_Icon.names = Object.keys(defaultIcons)
_Icon.defaultProps = defaultProps

export const Icon = _Icon as Icon
