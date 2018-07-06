import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Modal" examplePath="organisms/Modal/Types/ModalExample" noStaticMarkup>
                A modal example.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
