import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.SCREEN, "ErrorScreen", [], module).add(() => (
    <ExampleSection title="">
        <ComponentExample title="" examplePath="screens/ErrorScreen/ErrorScreenExample" />
    </ExampleSection>
))
