import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Grid Standard" description="" examplePath="layout/Grid/Types/GridStandard" />

            <ComponentExample title="Grid Offset" description="" examplePath="layout/Grid/Types/GridOffset" />

            <ComponentExample title="Grid Direction" description="" examplePath="layout/Grid/Types/GridDirection" />

            <ComponentExample title="Grid Gap" description="" examplePath="layout/Grid/Types/GridGap" />

            <ComponentExample title="Grid by example" description="" examplePath="layout/Grid/Types/GridExamples" />
        </ExampleSection>
    )
}

export default Types
