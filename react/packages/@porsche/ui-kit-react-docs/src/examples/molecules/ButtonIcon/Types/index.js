import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample
                title="Default Button Icon"
                examplePath="molecules/ButtonIcon/Types/ButtonIconExampleBasic"
            >
                Display an icon button in its default style.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
