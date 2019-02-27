import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Groups = () => {
    return (
        <ExampleSection title="Button Group">
            <ComponentExample title="Button Group" examplePath="molecules/Button/Groups/ButtonExampleGroups">
                You can group buttons using the button group component.
            </ComponentExample>

            <ComponentExample
                title="Button Group Stretched"
                examplePath="molecules/Button/Groups/ButtonExampleGroupsStretch"
            >
                If you want to use the stretch prop, be sure to set it on every button of the group.
            </ComponentExample>

            <ComponentExample
                title="Button Group Responsive"
                examplePath="molecules/Button/Groups/ButtonExampleGroupsResponsive"
            >
                You can group buttons depending on viewport size.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Groups
