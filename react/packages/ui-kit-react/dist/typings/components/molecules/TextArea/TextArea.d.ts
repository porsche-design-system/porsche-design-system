/// <reference types="react" />
import * as React from "react";
import { IconName } from "../../atoms/Icon/Icon";
export interface TextAreaProps {
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    basic?: boolean;
    disabled?: boolean;
    error?: boolean;
    icon?: IconName;
    maxLength?: number;
    name?: string;
    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLTextAreaElement>} event React's original event.
     * @param {TextAreaProps} data All props of the component.
     */
    onChange: (value: string, event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void;
    placeholder?: string;
    /** The number of lines of the text area. */
    rows?: number;
    value?: string;
}
/**
 * A TextArea.
 * @see Checkbox
 * @see TextArea
 * @see Input
 * @see Icon
 */
export declare const TextArea: React.StatelessComponent<TextAreaProps>;
