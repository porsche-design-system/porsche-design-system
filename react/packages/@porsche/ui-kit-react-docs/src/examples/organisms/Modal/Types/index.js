import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Default Modal" examplePath="organisms/Modal/Types/ModalExample" noStaticMarkup>
                A simple modal can be created with very little configuration. By default it tries to fit the content and
                has a fairly narrow <code>max-width</code> to ensure a readable line length for simple content on larger
                screens.
            </ComponentExample>

            <ComponentExample title="Wide" examplePath="organisms/Modal/Types/ModalExampleWide" noStaticMarkup>
                If you have more complex content, use the <code>wide</code> prop to let the modal stretch the entire
                width of the page (minus paddings of course).
            </ComponentExample>

            <ComponentExample
                title="Wide with custom container css"
                examplePath="organisms/Modal/Types/ModalExampleWideCustomContainer"
                noStaticMarkup
            >
                If you want to e.g. give the container a fixed width independent from the content, use the
                "container-css" prop to pass a custom css class.
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

            <ComponentExample title="Loading" examplePath="organisms/Modal/Types/ModalExampleLoading" noStaticMarkup>
                A modal can show a loading indicator across its entire content. The close button is above the loading
                backdrop and is still clickable.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
