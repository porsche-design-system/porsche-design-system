import React from "react"
import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"

const ContentWrapperTypes = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample
                title="Content Wrapper"
                examplePath="structures/ContentWrapper/Types/ContentWrapperExample"
            >
                A simple wrapper for content organisms with max-width and safe area paddings.
            </ComponentExample>

            <ComponentExample
                title="Content Wrapper Raw"
                examplePath="structures/ContentWrapper/Types/ContentWrapperExampleRaw"
            >
                A simple wrapper for content organisms with no max width declaration and zero paddings.
            </ComponentExample>
        </ExampleSection>
    )
}

export default ContentWrapperTypes
