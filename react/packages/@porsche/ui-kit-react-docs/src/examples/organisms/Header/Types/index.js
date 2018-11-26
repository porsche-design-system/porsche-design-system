import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => (
    <ExampleSection title="Types">
        <ComponentExample title="Header" examplePath="organisms/Header/Types/HeaderExample">
            The header component with logo and navigation bar
        </ComponentExample>

        <ComponentExample
            title="Header without navigation"
            examplePath="organisms/Header/Types/HeaderWithoutNavigationExample"
        >
            The header component if no navigation items are set
        </ComponentExample>
    </ExampleSection>
)

export default Types
