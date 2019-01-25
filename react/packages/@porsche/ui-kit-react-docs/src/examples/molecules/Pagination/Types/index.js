import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
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
