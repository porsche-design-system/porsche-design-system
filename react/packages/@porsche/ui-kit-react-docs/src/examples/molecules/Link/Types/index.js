import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

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
