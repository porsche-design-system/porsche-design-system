import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">

            <ComponentExample
                title="Counter"
                description="Counter element"
                examplePath="atoms/Counter/Types/CounterExample"
            />

        </ExampleSection>
    )
}

export default Types
