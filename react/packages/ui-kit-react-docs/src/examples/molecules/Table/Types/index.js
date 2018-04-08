import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">

            <ComponentExample
                title="Building a Custom Table"
                examplePath="molecules/Table/Types/TableExampleBasicsFull"
            >
        You can build a fully custom table with many customization options.
            </ComponentExample>

        </ExampleSection>
    )
}

export default Types
