import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const ToastExamples = () => (
    <React.Fragment>
        <ExampleSection title="Toast">
            <ComponentExample title="Simple Example" examplePath="organisms/Toast/ToastExampleSimple">
                The <code>Toast</code> component displays a simple notification with a close button.
            </ComponentExample>

            <ComponentExample title="onClick" examplePath="organisms/Toast/ToastExampleClick">
                If a <code>Toast</code> has no <code>onClick</code> handler, no close button is displayed.
            </ComponentExample>

            <ComponentExample title="Toast Type" examplePath="organisms/Toast/ToastExampleType">
                A <code>Toast</code> can have different types to display different levels of urgency.
            </ComponentExample>
        </ExampleSection>

        <ExampleSection title="Toast List">
            <ComponentExample title="Simple Example" examplePath="organisms/Toast/ToastExampleList">
                Toast can be displayed as a responsive list using the <code>Toast.List</code> component. If you want to
                experience the responsiveness, you should probably maximize this example.
            </ComponentExample>
        </ExampleSection>
    </React.Fragment>
)

export default ToastExamples
