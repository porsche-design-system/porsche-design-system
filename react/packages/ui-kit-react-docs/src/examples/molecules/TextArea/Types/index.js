import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample
                title="Text Area with Floating Placeholder"
                examplePath="molecules/TextArea/Types/TextAreaExampleTypesPlaceholder"
            >
                A text area with a placeholder that turns into a floating label.
            </ComponentExample>

            <ComponentExample
                title="TextArea with Regular Placeholder"
                examplePath="molecules/TextArea/Types/TextAreaExampleTypesPlaceholderBasic"
            >
                The floating label can optionally be disabled.
            </ComponentExample>

            <ComponentExample title="Disabled" examplePath="molecules/TextArea/Types/TextAreaExampleTypesDisabled">
                A text area can be disabled.
            </ComponentExample>

            <ComponentExample title="Error" examplePath="molecules/TextArea/Types/TextAreaExampleTypesError">
                A text area can show an error.
            </ComponentExample>

            <ComponentExample
                title="Error + Disabled"
                examplePath="molecules/TextArea/Types/TextAreaExampleTypesErrorDisabled"
            >
                A text area can show an error and be disabled.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
