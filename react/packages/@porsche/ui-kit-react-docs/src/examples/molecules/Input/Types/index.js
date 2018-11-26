import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample
                title="Input with Floating Placeholder"
                examplePath="molecules/Input/Types/InputExampleTypesPlaceholder"
            >
                An input with a placeholder that turns into a floating label.
            </ComponentExample>

            <ComponentExample
                title="Input with Regular Placeholder"
                examplePath="molecules/Input/Types/InputExampleTypesPlaceholderBasic"
            >
                The floating label can optionally be disabled.
            </ComponentExample>

            <ComponentExample title="Input with Icon" examplePath="molecules/Input/Types/InputExampleTypesIcon">
                An input can show an icon on the right.
            </ComponentExample>

            <ComponentExample title="Input with Unit" examplePath="molecules/Input/Types/InputExampleTypesUnit">
                An input can show a unit on the right, if an icon is not shown. You should probably use{" "}
                <code>basic</code> together with a unit since it aligns much better.
            </ComponentExample>

            <ComponentExample
                title="Input without Placeholder"
                examplePath="molecules/Input/Types/InputExampleTypesNoPlaceholder"
            >
                An input should definitely have a placeholder, but it doesn't require it.
            </ComponentExample>

            <ComponentExample title="Disabled" examplePath="molecules/Input/Types/InputExampleTypesDisabled">
                An input can be disabled.
            </ComponentExample>

            <ComponentExample title="Autofocus" examplePath="molecules/Input/Types/InputExampleTypesAutofocus">
                An input can have an autofocus.
            </ComponentExample>

            <ComponentExample title="Error" examplePath="molecules/Input/Types/InputExampleTypesError">
                An input can show an error.
            </ComponentExample>

            <ComponentExample
                title="Error + Disabled"
                examplePath="molecules/Input/Types/InputExampleTypesErrorDisabled"
            >
                An input can show an error and be disabled.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
