/// <reference types="react" />
import * as React from "react";
import { IconName } from "../../../components/atoms/Icon/Icon";
export interface ButtonCircleProps {
    /** The html element type to render as. */
    as?: any;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /**
     * Align "left" puts the icon first, align "right" puts the text first.
     * @default left
     */
    align?: "left" | "right";
    /** Disables the button. No onClick will be triggered. */
    disabled?: boolean;
    /** The icon of the button. */
    icon: IconName;
    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLButtonElement>} event React's original event.
     * @param {ButtonCircleProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonCircleProps) => void;
}
/**
 * Displays an icon inside a round outlined button. Text can optionally be displayed to the right or left of that button.
 * @see Icon
 */
export declare const ButtonCircle: React.StatelessComponent<ButtonCircleProps>;
