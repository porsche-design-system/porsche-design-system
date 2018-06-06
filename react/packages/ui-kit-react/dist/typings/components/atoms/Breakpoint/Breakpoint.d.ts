import * as React from "react"
export interface Breakpoint extends React.StatelessComponent<BreakpointProps> {
    xs: number
    s: number
    m: number
    l: number
    xl: number
}
export interface BreakpointProps {
    /** The minimum breakpoint that includes the children. */
    minWidth?: "xs" | "s" | "m" | "l" | "xl"
    /** The maximum breakpoint that includes the children. */
    maxWidth?: "xs" | "s" | "m" | "l" | "xl"
}
/**
 * Show and hide children based on minimum and maximum breakpoints.
 * The currently defined breakpoints are:
 * xs: 480,
 * s: 760,
 * m: 1000,
 * l: 1300,
 * xl: 1760
 */
export declare const Breakpoint: Breakpoint
