import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

import { MaintenanceScreen } from "@porsche/ui-kit-react"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.SCREEN, MaintenanceScreen, [], module).add(() => (
    <ExampleSection title="">
        <ComponentExample title="" examplePath="screens/MaintenanceScreen/MaintenanceScreenExample" />
    </ExampleSection>
))
