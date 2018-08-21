import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Standardized Content">
            <ComponentExample
                title="Modal Title and Copy Text"
                examplePath="organisms/Modal/Content/ModalExampleContentTitleText"
                noStaticMarkup
            >
                To standardize common use cases for modals, you can use a couple of building blocks for modals. Use{" "}
                <code>Modal.Title</code> for modal headlines and <code>Modal.Text</code> for copy text.
            </ComponentExample>

            <ComponentExample
                title="Button Bar"
                examplePath="organisms/Modal/Content/ModalExampleContentButtons"
                noStaticMarkup
            >
                You can also use <code>Modal.Buttons</code> for right-aligned button bars. You should probably only use
                one or more <code>Button</code> components as children of this component.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
