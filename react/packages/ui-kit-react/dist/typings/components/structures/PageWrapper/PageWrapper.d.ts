/// <reference types="react" />
import * as React from "react";
export interface PageWrapperProps {
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
 * This component must be used as a wrapper of a complete page/view. Direct children may only exist of "AreaWrapper" components.
 */
export declare const PageWrapper: React.StatelessComponent<PageWrapperProps>;
