import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const EdgeCases = () => {
    return (
        <ExampleSection title="Edge Cases">

            <ComponentExample
                title="Long Title"
                examplePath="molecules/Button/EdgeCases/ButtonExampleLongTitle"
            >
                Don't worry, a button can handle an overly long title gracefully.
            </ComponentExample>

            <ComponentExample
                title="Long Title in a Button Group"
                examplePath="molecules/Button/EdgeCases/ButtonExampleLongTitleGroup"
            >
                A button with an overly long title in a button group is also handled gracefully when stretch is set.
            </ComponentExample>

        </ExampleSection>
    )
}

export default EdgeCases
