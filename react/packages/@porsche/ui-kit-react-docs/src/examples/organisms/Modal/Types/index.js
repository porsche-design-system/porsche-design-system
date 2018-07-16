import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Default Modal" examplePath="organisms/Modal/Types/ModalExample" noStaticMarkup>
                A simple modal can be created with very little configuration. By default it tries to fit the content and
                has a fairly narrow <code>max-width</code> to ensure a readable line length for simple content on larger
                screens.
            </ComponentExample>

            <ComponentExample
                title="Full Width"
                examplePath="organisms/Modal/Types/ModalExampleFullWidth"
                noStaticMarkup
            >
                If you have more complex content, use the <code>fullWidth</code> prop to let the modal stretch the
                entire width of the page (minus paddings of course).
            </ComponentExample>

            <ComponentExample
                title="Show Close Icon"
                examplePath="organisms/Modal/Types/ModalExampleShowCloseIcon"
                noStaticMarkup
            >
                By default, a modal always shows a close icon in the top right corner. If you want to hide it, you can
                use the <code>showCloseIcon</code> prop. You can always close a modal by clicking or tapping the
                backdrop.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
