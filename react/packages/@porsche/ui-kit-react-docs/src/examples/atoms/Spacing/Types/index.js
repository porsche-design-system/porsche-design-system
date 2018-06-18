import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => (
    <ExampleSection title="Spacings">
        <ComponentExample
            title="Static Spacing"
            description=""
            examplePath="atoms/Spacing/Types/SpacingExampleStatic"
        />

        <ComponentExample
            title="Responsive Spacing"
            description=""
            examplePath="atoms/Spacing/Types/SpacingExampleResponsive"
        />

        <ComponentExample
            title="Static Flexbox Grid-Like Spacing"
            description=""
            examplePath="atoms/Spacing/Types/SpacingExampleFlexGridStatic"
        />

        <ComponentExample
            title="Responsive Flexbox Grid-Like Spacing"
            description=""
            examplePath="atoms/Spacing/Types/SpacingExampleFlexGridResponsive"
        />
    </ExampleSection>
)

export default Types
