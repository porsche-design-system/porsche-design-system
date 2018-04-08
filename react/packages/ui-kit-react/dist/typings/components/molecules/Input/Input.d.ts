/// <reference types="react" />
import * as React from "react";
import { IconName } from "../../atoms/Icon/Icon";
export interface InputProps {
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /**
     * Basic determines if the placeholder disappears when a value is set or entered,
     * or if it floats above the content.
     */
    basic?: boolean;
    /** An input can appear disabled and be unable to change states. */
    disabled?: boolean;
    /** An input can display an error. */
    error?: boolean;
    /** Displays an icon on the right of the input. */
    icon?: IconName;
    /** Sets the html5 name of the input field. */
    name?: string;
    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLInputElement>} event React's original event.
     * @param {InputProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>, data: InputProps) => void;
    /** The placeholder of the input. */
    placeholder?: string;
    /**
     * The html input type.
     * @default text
     */
    type?: "text" | "password" | "number";
    /** Displays a unit on the right of the input. */
    unit?: string;
    /** The value of the input. */
    value?: string;
}
/**
 * An Input is a field used to elicit a textual response from a user.
 * @see Icon
 * @see Checkbox
 * @see TextArea
 * @see Select
 */
export declare const Input: React.StatelessComponent<InputProps>;
