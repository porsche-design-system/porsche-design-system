import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Settings">
            <ComponentExample
                title="MinWidth"
                examplePath="atoms/Breakpoint/Settings/BreakpointExampleSettingsMinWidth"
            >
                You can use <code>minWidth</code> to render children starting from a specific breakpoint. If you don't
                see text below try and resize your browser.
            </ComponentExample>

            <ComponentExample
                title="MaxWidth"
                examplePath="atoms/Breakpoint/Settings/BreakpointExampleSettingsMaxWidth"
            >
                You can use <code>maxWidth</code> to render children up to a specific breakpoint. If you don't see text
                below try and resize your browser.
            </ComponentExample>

            <ComponentExample
                title="Current Breakpoint"
                examplePath="atoms/Breakpoint/Settings/BreakpointExampleSettingsCurrentBreakpoint"
            >
                The following example displays the current active breakpoint. Try it out and change your browser width!
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
