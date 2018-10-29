import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.ORGANISM, "CookieNotification", [], module).add(() => (
    <ExampleSection title="Cookie Notification">
        <ComponentExample title="Default" examplePath="organisms/CookieNotification/CookieNotificationExample">
            The cookie notification displays a full-width disclaimer preferrably at the top of the page.
        </ComponentExample>
    </ExampleSection>
))
