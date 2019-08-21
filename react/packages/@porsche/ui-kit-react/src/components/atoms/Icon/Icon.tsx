import * as React from "react"
import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import cx from "classnames"
import { icons as defaultIcons } from "./icons"

export interface IconProps extends ClassNameProp, ComponentProp {
    /** The icon that should be used. */
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

    /**
     * Registers an additional set of icons. Use this to include project specific icons.
     * You can only register one set of icons per runtime, and previously registered icons will be overriden by this method.
     * If you register an icon under the same name as a default icon, the registered icon is preferred.
     * Make sure registering is done before any rendering of the React application is happening, or the icons won't be available.
     */
    registerIcons: (icons: Record<string, (props: React.SVGProps<any>) => JSX.Element>) => void
}

const defaultProps: Partial<IconProps> = {
    size: "regular"
}

const _Icon: React.FunctionComponent<IconProps> & Partial<Icon> = (props) => {
    const { name, className, color, hoverColor, disabled, onClick, ...iconRest } = props

    const actualColor = onClick && !props.color ? "grey" : props.color
    const actualHoverColor = onClick && !props.hoverColor ? "black" : props.hoverColor

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
    const SVGIcon = (registeredIcons as any)[name] || (defaultIcons as any)[name]

    if (!SVGIcon) {
        return null
    }

    const classes = cx(
        prefix("icon"),
        prefix(`icon--${size}`),
        { [prefix("icon--circled")]: circled },
        { [prefix(`icon--${actualColor}`)]: actualColor !== undefined },
        { [prefix(`icon--${actualHoverColor}--hover`)]: !disabled && actualHoverColor !== undefined },
        { [prefix(`icon--link`)]: !!onClick && !disabled },
        className
    )

    return (
        <ElementType {...rest} onClick={handleClick} className={classes}>
            <SVGIcon />
        </ElementType>
    )
}

let registeredIcons = {}

function registerIcons(icons: Record<string, (props: React.SVGProps<any>) => JSX.Element>) {
    registeredIcons = icons
    _Icon.names = [...Object.keys(defaultIcons), ...Object.keys(registeredIcons)]
}

_Icon.registerIcons = registerIcons
_Icon.names = Object.keys(defaultIcons)
_Icon.defaultProps = defaultProps

export const Icon = _Icon as Icon
