import React from "react"
import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.SCREEN, "ErrorScreen", [], module).add(() => (
    <ExampleSection title="">
        <ComponentExample title="" examplePath="screens/ErrorScreen/ErrorScreenExample" />
    </ExampleSection>
))
