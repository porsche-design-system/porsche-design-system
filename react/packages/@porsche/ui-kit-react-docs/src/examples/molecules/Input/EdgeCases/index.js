import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const EdgeCases = () => {
    return (
        <ExampleSection title="Edge Cases">
            <ComponentExample title="Long Text" examplePath="molecules/Input/EdgeCases/InputExampleEdgeCasesLongText">
                An input can handle overly long text as placeholder and value gracefully.
            </ComponentExample>

            <ComponentExample
                title="Long Text with an Icon"
                examplePath="molecules/Input/EdgeCases/InputExampleEdgeCasesLongTextIcon"
            >
                Even with an icon the text ellipsis still works.
            </ComponentExample>
        </ExampleSection>
    )
}

export default EdgeCases
