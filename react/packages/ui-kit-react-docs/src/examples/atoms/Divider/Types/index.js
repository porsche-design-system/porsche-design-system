import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
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
