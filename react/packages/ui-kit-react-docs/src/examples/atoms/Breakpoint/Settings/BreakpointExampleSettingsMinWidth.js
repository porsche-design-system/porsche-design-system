import React from "react"
import { Breakpoint } from "@porsche/ui-kit-react"

const BreakpointExampleSettingsMinWidth = () => {
    return (
        <Breakpoint minWidth="m">
            This text can only be seen from Breakpoint <code>m</code> and up.
        </Breakpoint>
    )
}

export default BreakpointExampleSettingsMinWidth
