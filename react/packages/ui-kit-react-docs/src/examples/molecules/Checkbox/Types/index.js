import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">

            <ComponentExample
                title="Checked"
                examplePath="molecules/Checkbox/Types/CheckboxExampleChecked"
            >
        A checkbox can be checked or unchecked.
            </ComponentExample>

            <ComponentExample
                title="Disabled"
                examplePath="molecules/Checkbox/Types/CheckboxExampleDisabled"
            >
        A checkbox can be <code>disabled</code>. No <code>onChange</code> event will be dispatched.
            </ComponentExample>

            <ComponentExample
                title="Error"
                examplePath="molecules/Checkbox/Types/CheckboxExampleError"
            >
        A checkbox can be display an error state.
            </ComponentExample>

            <ComponentExample
                title="ReadOnly"
                examplePath="molecules/Checkbox/Types/CheckboxExampleReadOnly"
            >
        A checkbox can be read only. No onChange event will be dispatched.
            </ComponentExample>

        </ExampleSection>
    )
}

export default Types
