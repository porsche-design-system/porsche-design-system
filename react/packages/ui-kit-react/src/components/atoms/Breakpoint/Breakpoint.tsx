import * as React from "react"

// We need version ^3.0.0 to support react 15. Using fragments might mess this up, maybe we should use matchmediaquery directly
import MediaQuery from "react-responsive"

import { breakpoints, META } from "../../../lib"
import { ComponentMeta, MetaCategorizable } from "../../../types/MetaCategorizable"

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

const _meta: ComponentMeta = {
    name: "Breakpoint",
    type: META.TYPES.ATOM
}

const _Breakpoint: React.StatelessComponent<BreakpointProps> & Partial<Breakpoint> & Partial<MetaCategorizable> = (
    props
) => {
    const { children, minWidth, maxWidth, ...rest } = props

    const minWidthValue = minWidth ? breakpoints[minWidth] + "px" : undefined
    const maxWidthValue = maxWidth ? breakpoints[maxWidth] - 1 + "px" : undefined

    return (
        <MediaQuery minWidth={minWidthValue} maxWidth={maxWidthValue} {...rest}>
            {children}
        </MediaQuery>
    )
}

_Breakpoint._meta = _meta

_Breakpoint.xs = breakpoints.xs
_Breakpoint.s = breakpoints.s
_Breakpoint.m = breakpoints.m
_Breakpoint.l = breakpoints.l
_Breakpoint.xl = breakpoints.xl

/**
 * Show and hide children based on minimum and maximum breakpoints.
 * The currently defined breakpoints are:
 * xs: 480,
 * s: 760,
 * m: 1000,
 * l: 1300,
 * xl: 1760
 */
export const Breakpoint = _Breakpoint as Breakpoint
