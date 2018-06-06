/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { IconName } from "../../atoms/Icon/Icon"
export interface InputProps extends ClassNameProp, ComponentProp {
    /**
     * Basic determines if the placeholder disappears when a value is set or entered,
     * or if it floats above the content.
     * If no placeholder is set, this value has no effect.
     * @default false
     */
    basic?: boolean
    /** An input can appear disabled and be unable to change states. */
    disabled?: boolean
    /** An input can display an error. */
    error?: boolean
    /** Displays an icon on the right of the input. */
    icon?: IconName
    /**
     * Sets the html5 name of the input field.
     * The name attribute is used to reference elements in a JavaScript, or to reference form data after a form is submitted.
     */
    name?: string
    /**
     * Called when the user attempts to change the input value.
     * @param {string} value The proposed value after the change.
     * @param {React.FormEvent<HTMLInputElement>} event React's original event.
     * @param {InputProps} data All props of the component.
     */
    onChange?: (value: string, event: React.FormEvent<HTMLInputElement>, data: InputProps) => void
    /** The placeholder of the input. */
    placeholder?: string
    /**
     * The html input type.
     * @default text
     */
    type?: "text" | "password" | "number"
    /** Displays a unit on the right of the input. */
    unit?: string
    /** The value of the input. */
    value?: string
}
/**
 * An Input is a field used to elicit a textual response from a user.
 * @see Icon
 * @see Checkbox
 * @see TextArea
 * @see Select
 */
export declare const Input: React.StatelessComponent<InputProps>
