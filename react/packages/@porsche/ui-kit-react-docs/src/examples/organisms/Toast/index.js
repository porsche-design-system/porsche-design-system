import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

import { Toast } from "@porsche/ui-kit-react"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ORGANISM, Toast, [], module)
    .addPropsTable(Toast.List)
    .addPropsTable(Toast.Manager)
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
                    A manager that can be used to issue toasts via globally available methods using the
                    <code>Toast.Manager</code>. Toasts fade out after the set timeout.
                </ComponentExample>
            </ExampleSection>
        </React.Fragment>
    ))
