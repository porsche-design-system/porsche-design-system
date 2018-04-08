/// <reference types="react" />
import * as React from "react";
export interface ScrollProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /**
     * The scroll direction.
     * @default vertical
     */
    direction?: "vertical";
}
/**
 * Use this component any time you want to provide a scrolling section for long content.
 */
export declare const Scroll: React.StatelessComponent<ScrollProps>;
