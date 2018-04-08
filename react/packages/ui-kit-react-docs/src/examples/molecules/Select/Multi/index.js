import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const SelectExampleMulti = () => {
    return (
        <ExampleSection title="Multi Select">

            <ComponentExample
                title="Basics"
                examplePath="molecules/Select/Multi/SelectExampleMulti"
            >
            A select for multiple values.
            </ComponentExample>

            <ComponentExample
                title="Disabled"
                examplePath="molecules/Select/Multi/SelectExampleMultiDisabled"
            />

            <ComponentExample
                title="Error"
                examplePath="molecules/Select/Multi/SelectExampleMultiError"
            />

            <ComponentExample
                title="Loading"
                examplePath="molecules/Select/Multi/SelectExampleMultiLoading"
            />

        </ExampleSection>
    )
}

export default SelectExampleMulti
