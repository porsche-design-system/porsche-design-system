/// <reference types="react" />
import * as React from "react"
import { IconName } from "../../atoms/Icon/Icon"
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
/**
 * The default Porsche button.
 * @see Icon
 */
export declare const Button: Button
