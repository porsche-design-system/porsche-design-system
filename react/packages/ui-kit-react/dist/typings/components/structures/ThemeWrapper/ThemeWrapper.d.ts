/// <reference types="react" />
import * as React from "react";
export interface ThemeWrapperProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /**
     * The type of the wrapper.
     * @default light
     */
    theme?: "light" | "dark" | "transparent";
}
/**
 * This component is a direct child of "AreaWrapper" component and adds basic background themings to visually define larger content sections.
 * Direct children of this component may only exist of "ContentWrapper" components.
 */
export declare const ThemeWrapper: React.StatelessComponent<ThemeWrapperProps>;
