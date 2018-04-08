import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Groups = () => {
    return (
        <ExampleSection title="Button Group">
            <ComponentExample
                title="Button Group"
                examplePath="molecules/Button/Groups/ButtonExampleGroups"
            >
            You can group buttons using the button group component.
            </ComponentExample>

            <ComponentExample
                title="Button Group Stretched"
                examplePath="molecules/Button/Groups/ButtonExampleGroupsStretch"
            >
            If you want to use the stretch prop, be sure to set it on every button of the group.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Groups
