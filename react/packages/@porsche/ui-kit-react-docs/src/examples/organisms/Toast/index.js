import React from "react"
import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ORGANISM, "Toast", [], module)
    .addPropsTable("Toast.List")
    .addPropsTable("Toast.Manager")
    .add(() => (
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
                    Toast can be displayed as a responsive list using the <code>Toast.List</code> component. If you want
                    to experience the responsiveness, you should probably maximize this example.
                </ComponentExample>
            </ExampleSection>

            <ExampleSection title="Toast Manager">
                <ComponentExample title="Simple Example" examplePath="organisms/Toast/ToastExampleManager">
                    You can use <code>Toast.Manager</code> to easily dispatch toasts from anywhere in the app using
                    <code>emit, info, warning, success, error</code>. You can customize each toast with options as well.
                </ComponentExample>
            </ExampleSection>
        </React.Fragment>
    ))
