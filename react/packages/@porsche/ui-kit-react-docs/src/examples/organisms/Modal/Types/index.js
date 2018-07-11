import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Modal" examplePath="organisms/Modal/Types/ModalExample" noStaticMarkup>
                A modal example.
            </ComponentExample>

            <ComponentExample
                title="Full Width"
                examplePath="organisms/Modal/Types/ModalExampleFullWidth"
                noStaticMarkup
            >
                A modal example across the entire width of the page.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
