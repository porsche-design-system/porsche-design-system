import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Default / Selected" examplePath="molecules/Radio/Types/RadioExampleSelected">
                A Radio can be Selected or unselected
            </ComponentExample>

            <ComponentExample title="Disabled" examplePath="molecules/Radio/Types/RadioExampleDisabled">
                A Radio can be disabled
            </ComponentExample>

            <ComponentExample title="Error" examplePath="molecules/Radio/Types/RadioExampleError">
                A Radio can display an error state
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
