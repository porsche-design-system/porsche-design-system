import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const EdgeCases = () => {
    return (
        <ExampleSection title="Edge Cases">

            <ComponentExample
                title="Super Long Values"
                examplePath="molecules/Select/EdgeCases/SelectExampleLongValue"
            >
        Long labels for values end up with an ellipsis in single and multi select.
            </ComponentExample>

            <ComponentExample
                title="Super Long Values and Group Titles"
                examplePath="molecules/Select/EdgeCases/SelectExampleLongValueGrouped"
            >
        Long group names wrap to display the entire name.
            </ComponentExample>

        </ExampleSection>
    )
}

export default EdgeCases
