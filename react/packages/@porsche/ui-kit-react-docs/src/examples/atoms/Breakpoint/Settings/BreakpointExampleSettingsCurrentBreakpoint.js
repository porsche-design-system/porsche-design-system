import React from "react"
import { Breakpoint } from "@porsche/ui-kit-react"

const BreakpointExampleSettingsCurrentBreakpoint = () => {
    return (
        <div>
            {"Current Breakpoint is "}
            <Breakpoint maxWidth="xs">
                <code>0 ↔ xs</code>
            </Breakpoint>

            <Breakpoint minWidth="xs" maxWidth="s">
                <code>xs ↔ s</code>
            </Breakpoint>

            <Breakpoint minWidth="s" maxWidth="m">
                <code>s ↔ m</code>
            </Breakpoint>

            <Breakpoint minWidth="m" maxWidth="l">
                <code>m ↔ l</code>
            </Breakpoint>

            <Breakpoint minWidth="l" maxWidth="xl">
                <code>l ↔ xl</code>
            </Breakpoint>

            <Breakpoint minWidth="xl">
                <code>xl ↔ ∞</code>
            </Breakpoint>
        </div>
    )
}

export default BreakpointExampleSettingsCurrentBreakpoint
