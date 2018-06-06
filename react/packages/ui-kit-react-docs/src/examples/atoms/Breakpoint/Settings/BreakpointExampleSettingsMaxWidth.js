import React from "react"
import { Breakpoint } from "@porsche/ui-kit-react"

const BreakpointExampleSettingsMaxWidth = () => {
    return (
        <Breakpoint maxWidth="m">
            This text can only be seen up to Breakpoint <code>m</code>.
        </Breakpoint>
    )
}

export default BreakpointExampleSettingsMaxWidth
