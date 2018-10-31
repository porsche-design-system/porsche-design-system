import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample
                title="Divider"
                description="Divider line for sectioning contents."
                examplePath="atoms/Divider/Types/DividerExample"
            />

            <ComponentExample
                title="Spacing"
                description="A divider has predefined top and bottom spacings for more consistent styling."
                examplePath="atoms/Divider/Types/DividerExampleSpacing"
            />
        </ExampleSection>
    )
}

export default Types
