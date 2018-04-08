/// <reference types="react" />
import * as React from "react";
export interface CheckboxProps {
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** Custom dom attributes for the checkbox element only. */
    checkboxCustomAttributes?: {
        [key: string]: any;
    };
    /**
     * Whether or not the checkbox is checked.
     * @default checked
     */
    checked?: boolean;
    /** A checkbox can appear disabled and be unable to change states. */
    disabled?: boolean;
    /** A checkbox can display an error. */
    error?: boolean;
    /**
     * Called when the user attempts to change the checked state.
     * @param {boolean} value The proposed value after the change.
     * @param {SyntheticEvent} event React's original event.
     * @param {CheckboxProps} data All props of the component.
     */
    onChange?: (value: boolean, event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void;
    /** A checkbox can be read-only and unable to change states. */
    readOnly?: boolean;
    /** Determines if the content is wrapped or truncated with an ellipsis */
    singleLine?: boolean;
    /**
     * The appearance of the checkbox.
     * @default default
     */
    type?: "default" | "red" | "blue" | "inverted";
}
/**
 * A checkbox allows a user to select a binary value.
 * @see Icon
 * @see Input
 * @see TextArea
 * @see Select
 */
export declare const Checkbox: React.StatelessComponent<CheckboxProps>;
