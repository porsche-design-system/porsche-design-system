/// <reference types="react" />
import * as React from "react";
export interface DividerProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
}
/**
 * A very basic divider.
 */
export declare const Divider: React.StatelessComponent<DividerProps>;
