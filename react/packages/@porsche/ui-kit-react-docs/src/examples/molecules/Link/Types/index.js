import React from "react"
import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"

const FlyoutExampleTypes = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Link" examplePath="molecules/Link/Types/LinkExampleBasic">
                A simple Link
            </ComponentExample>
            <ComponentExample title="Link with icon" examplePath="molecules/Link/Types/LinkExampleWithIcon">
                A simple Link with icon
            </ComponentExample>
        </ExampleSection>
    )
}

export default FlyoutExampleTypes
