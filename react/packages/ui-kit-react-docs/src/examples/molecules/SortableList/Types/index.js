import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">

            <ComponentExample
                title="Default Sortable List"
                examplePath="molecules/SortableList/Types/SortableListExample"
            >
                A sortable List.
            </ComponentExample>

        </ExampleSection>
    )
}

export default Types
