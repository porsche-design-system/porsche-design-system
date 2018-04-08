/// <reference types="react" />
import * as React from "react";
import { IconName } from "../../atoms/Icon/Icon";
import { ButtonGroup } from "./ButtonGroup";
export interface Button extends React.StatelessComponent<ButtonProps> {
    Group: typeof ButtonGroup;
}
export interface ButtonProps {
    /** The html element type to render as. */
    as?: string;
    /** Primary content. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** Disables the button. No onClick will be triggered. */
    disabled?: boolean;
    /** A button can show an error. */
    error?: boolean;
    /**
     * The icon of the button.
     * @default arrow_right_hair
     */
    icon?: IconName;
    /** Disable the button and show a loading indicator. No onClick will be triggered. */
    loading?: boolean;
    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLButtonElement>} event React's original event.
     * @param {ButtonProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void;
    /** A button can stretch to fill the full available width. */
    stretch?: boolean;
    /**
     * The display type of the button.
     * @default default
     */
    type?: "default" | "black" | "red" | "blue" | "acid-green" | "ghost" | "ghost-inverted";
}
/**
 * The default Porsche button.
 * @see Icon
 */
export declare const Button: Button;
