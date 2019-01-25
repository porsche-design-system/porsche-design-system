import React from "react"
import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"

const SelectExampleMulti = () => {
    return (
        <ExampleSection title="Multi Select">
            <ComponentExample
                title="Multi Select with Floating Placeholder"
                examplePath="molecules/Select/Multi/SelectExampleMulti"
            >
                A select for multiple values with a floating placeholder.
            </ComponentExample>

            <ComponentExample
                title="Multi Select with Regular Placeholder"
                examplePath="molecules/Select/Multi/SelectExampleMultiBasic"
            >
                A select for multiple values with a regular placeholder.
            </ComponentExample>

            <ComponentExample title="Disabled" examplePath="molecules/Select/Multi/SelectExampleMultiDisabled" />

            <ComponentExample title="Error" examplePath="molecules/Select/Multi/SelectExampleMultiError" />
        </ExampleSection>
    )
}

export default SelectExampleMulti
