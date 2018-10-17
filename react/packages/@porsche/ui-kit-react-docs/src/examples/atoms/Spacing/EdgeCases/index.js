import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
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
