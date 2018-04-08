/// <reference types="react" />
import * as React from "react";
export interface ButtonGroupProps {
    /** The html element type to render as. */
    as?: string;
    /** Primary content. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
}
/**
 * A button group wrapper for the default button.
 */
export declare const ButtonGroup: React.StatelessComponent<ButtonGroupProps>;
