import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => (
    <ExampleSection title="Edge Cases">
        <ComponentExample
            title="Text as Children"
            description="If a Spacing contains text, it automatically creates a wrapper."
            examplePath="atoms/Spacing/EdgeCases/SpacingExampleTextChildren"
        />
    </ExampleSection>
)

export default Types
