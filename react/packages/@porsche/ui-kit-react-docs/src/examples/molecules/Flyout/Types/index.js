import React from "react"
import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"

const FlyoutExampleTypes = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Flyout" examplePath="molecules/Flyout/Types/FlyoutExampleTypesBasic">
                A simple flyout with an arrow on top.
            </ComponentExample>

            <ComponentExample title="Arrow Direction" examplePath="molecules/Flyout/Types/FlyoutExampleTypesRightLeft">
                The flyout can have the arrow on the right or the left.
            </ComponentExample>
        </ExampleSection>
    )
}

export default FlyoutExampleTypes
