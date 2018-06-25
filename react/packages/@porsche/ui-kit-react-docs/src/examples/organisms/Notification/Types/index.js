import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => (
    <ExampleSection title="Types">
        <ComponentExample
            title="Notification Common"
            examplePath="organisms/Notification/Types/NotificationExampleCommon"
        >
            The common notification component
        </ComponentExample>
        <ComponentExample
            title="Notification Common with error state"
            examplePath="organisms/Notification/Types/NotificationExampleCommonError"
        >
            The common notification component with error state
        </ComponentExample>
        <ComponentExample
            title="Notification Cookie"
            examplePath="organisms/Notification/Types/NotificationExampleCookie"
        >
            The cookie notification component
        </ComponentExample>
    </ExampleSection>
)

export default Types
