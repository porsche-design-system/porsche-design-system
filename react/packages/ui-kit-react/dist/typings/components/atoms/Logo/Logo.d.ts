/// <reference types="react" />
import * as React from "react";
export interface LogoProps {
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
 * The famous and loved Porsche Logo, currently available in like one size.
 */
export declare const Logo: React.StatelessComponent<LogoProps>;
