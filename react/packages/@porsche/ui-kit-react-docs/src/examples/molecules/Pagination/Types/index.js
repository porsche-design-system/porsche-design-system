import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Basic" examplePath="molecules/Pagination/Types/PaginationExampleBasic">
                A simple Pagination component
            </ComponentExample>
        </ExampleSection>
    )
}

export { Types }
