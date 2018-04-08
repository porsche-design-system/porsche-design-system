import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const AreaWrapperTypes = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample
                title="Area Wrapper"
                description={`
            A global Wrapper which defines basic HTML page areas like <header>, <footer>, <main>, etc.
        `}
                examplePath="structures/AreaWrapper/Types/AreaWrapperExample"
            />
        </ExampleSection>
    )
}

export default AreaWrapperTypes
