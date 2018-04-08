/// <reference types="react" />
import * as React from "react";
export interface AreaWrapperProps {
    /** The html element type to render as. */
    as?: "header" | "footer" | "main" | "aside";
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
}
/**
 * This component is a direct child of "PageWrapper" component and defines basic content sections like header, footer, main, etc.
 * Direct children of this component may only exist of "ThemeWrapper" components.
 */
export declare const AreaWrapper: React.StatelessComponent<AreaWrapperProps>;
