import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Variations = () => {
    return (
        <ExampleSection title="Variations">
            <ComponentExample
                title="Basic Icon"
                examplePath="atoms/Icon/Variations/VariationsExampleSimple"
            >
        Display a simple Icon.
            </ComponentExample>

            <ComponentExample
                title="Size"
                examplePath="atoms/Icon/Variations/VariationsExampleSize"
            >
        An icon can vary in size.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Variations
