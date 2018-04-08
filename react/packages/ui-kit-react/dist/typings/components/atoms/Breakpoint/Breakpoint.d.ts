import * as React from "react";
export interface Breakpoint extends React.StatelessComponent<BreakpointProps> {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
}
export interface BreakpointProps {
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** The minimum breakpoint that includes the children. */
    minWidth?: "xs" | "s" | "m" | "l" | "xl";
    /** The maximum breakpoint that includes the children. */
    maxWidth?: "xs" | "s" | "m" | "l" | "xl";
}
/**
 * Show and hide children based on minimum and maximum breakpoints.
 */
export declare const Breakpoint: Breakpoint;
