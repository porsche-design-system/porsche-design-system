import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const EdgeCases = () => {
    return (
        <ExampleSection title="Edge Cases">
            <ComponentExample
                title="Text Area with Floating Placeholder and long value"
                examplePath="molecules/TextArea/EdgeCases/TextAreaExampleLongValue"
            >
                A text area with a placeholder that turns into a floating label and has prefilled a long value.
            </ComponentExample>
        </ExampleSection>
    )
}

export default EdgeCases
