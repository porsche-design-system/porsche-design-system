/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { IconName } from "../../atoms/Icon/Icon"
export interface TextAreaProps extends ClassNameProp, ComponentProp {
    basic?: boolean
    disabled?: boolean
    error?: boolean
    icon?: IconName
    maxLength?: number
    /**
     * Sets the html5 name of the input field.
     * The name attribute is used to reference elements in a JavaScript, or to reference form data after a form is submitted.
     */
    name?: string
    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLTextAreaElement>} event React's original event.
     * @param {TextAreaProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void
    placeholder?: string
    /** The number of lines of the text area. */
    rows?: number
    value?: string
}
/**
 * A TextArea.
 * @see Checkbox
 * @see TextArea
 * @see Input
 * @see Icon
 */
export declare const TextArea: React.StatelessComponent<TextAreaProps>
