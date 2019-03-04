import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Groups = () => {
    return (
        <ExampleSection title="Radio Group">
            <ComponentExample title="Radio Group" examplePath="molecules/Radio/Groups/RadioExampleGroup">
                You can group radios using the radio group component.
            </ComponentExample>

            <ComponentExample
                title="Radio Group vertical aligned"
                examplePath="molecules/Radio/Groups/RadioExampleVerticalGroup"
            >
                You can align radios within a group also vertical aligned
            </ComponentExample>
        </ExampleSection>
    )
}

export default Groups
