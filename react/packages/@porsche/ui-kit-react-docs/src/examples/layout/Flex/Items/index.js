import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Items = () => {
    return (
        <ExampleSection title="Flex Items">
            <ComponentExample title="Item Width" examplePath="layout/Flex/Items/FlexExampleItemWidth">
                The widths of <code>Flex.Items</code> is defined by its contents by default. But it is also possible to
                define equal widths or even specific widths.
            </ComponentExample>

            <ComponentExample title="Item Offsets" examplePath="layout/Flex/Items/FlexExampleItemOffset">
                Items can have different offsets that work similar like column widths.
            </ComponentExample>

            <ComponentExample title="Align Cross Axis" examplePath="layout/Flex/Items/FlexExampleAlignCrossAxis">
                You can override the cross axis alignment for individual flex items. Note that float, clear and
                vertical-align have no effect on a flex item.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Items
