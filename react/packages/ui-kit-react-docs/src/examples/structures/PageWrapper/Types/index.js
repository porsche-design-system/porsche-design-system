import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const PageWrapperTypes = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample
                title="Page Wrapper"
                description={`
            A global Wrapper which wraps the whole application.
        `}
                examplePath="structures/PageWrapper/Types/PageWrapperExample"
            />
        </ExampleSection>
    )
}

export default PageWrapperTypes
