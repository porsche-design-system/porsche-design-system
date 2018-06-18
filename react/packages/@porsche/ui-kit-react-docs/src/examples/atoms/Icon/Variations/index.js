import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Variations = () => {
    return (
        <ExampleSection title="Variations">
            <ComponentExample title="Basic Icon" examplePath="atoms/Icon/Variations/VariationsExampleSimple">
                Display a simple Icon in its default size.
            </ComponentExample>

            <ComponentExample title="Icon Sizes" examplePath="atoms/Icon/Variations/VariationsExampleSize">
                An icon can vary in size.
            </ComponentExample>

            <ComponentExample title="Circled Icons" examplePath="atoms/Icon/Variations/VariationsExampleCircled">
                An icon can have a surrounding circle.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Variations
