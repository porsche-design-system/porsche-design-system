import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const SelectExampleOptionGroups = () => {
    return (
        <ExampleSection title="Option Groups">
            <ComponentExample
                title="Single Select Option Groups"
                examplePath="molecules/Select/OptionGroups/SelectExampleOptionGroupSingle"
            >
                A select also supports single select option groups for displaying categories.
            </ComponentExample>

            <ComponentExample
                title="Multi Select Option Groups"
                examplePath="molecules/Select/OptionGroups/SelectExampleOptionGroupMulti"
            >
                Multi select option groups? Yes.
            </ComponentExample>
        </ExampleSection>
    )
}

export default SelectExampleOptionGroups
