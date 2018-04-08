import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => (
    <ExampleSection title="Vertical">

        <ComponentExample
            title="Height (explicit)"
            description=""
            examplePath="atoms/Scroll/Vertical/ScrollExampleExplicitHeight"
        >
            The Scroll component does need an explicit or implicit height that is calculated
            via own or parent properties but not via childs.
        </ComponentExample>

        <ComponentExample
            title="Height (implicit)"
            description=""
            examplePath="atoms/Scroll/Vertical/ScrollExampleImplicitHeight"
        />

    </ExampleSection>
)

export default Types
