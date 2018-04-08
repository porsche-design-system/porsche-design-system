/// <reference types="react" />
import * as React from "react";
export declare type TextType = "1-regular" | "1-thin" | "2-regular" | "2-thin" | "3-regular" | "3-thin" | "4-regular" | "4-thin" | "5-regular" | "5-thin" | "copy" | "small" | "micro";
export declare type ColorType = "black" | "grey-darker" | "grey-dark" | "grey" | "grey-light" | "grey-lighter" | "white" | "red-1" | "red-2" | "blue-1" | "blue-2";
export declare type TextAlignType = "left" | "center" | "right";
export interface TextProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** The text alignment of the component. */
    align?: TextAlignType;
    /**
     * The style of the color.
     * @default black
     */
    color?: ColorType;
    /**
     * Adds an ellipsis to a single line of text if it overflows.
     */
    ellipsis?: boolean;
    /** Sets the text as display: inline. */
    inline?: boolean;
    /**
     * The style of the text.
     * @default copy
     */
    type?: TextType;
    /**
     * Wraps the text, even when it has to break a word.
     * @default true
     */
    wrap?: boolean;
}
/**
 * Use this component any time you want to display plain text anywhere.
 */
export declare const Text: React.StatelessComponent<TextProps>;
