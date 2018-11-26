import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Items = () => {
    return (
        <ExampleSection title="Flex Items">
            <ComponentExample title="Flex Items" examplePath="atoms/Flex/Items/FlexExampleItemWidth">
                You can use <code>Flex.Item</code> to build grids. By default, all items will have the same width and
                will span the entire width of the container.
            </ComponentExample>

            <ComponentExample title="Automatic Item Widths" examplePath="atoms/Flex/Items/FlexExampleItemWidthAuto">
                You can use automatic item sizing. With this setting all items will be layouted using their intrinsic
                content width, and remaining or missing space will be distributed equally between all items.
            </ComponentExample>

            <ComponentExample title="Specific Item Widths" examplePath="atoms/Flex/Items/FlexExampleItemWidthSpecific">
                Items can have specific widths to fit your layout, independent of what content they contain. The
                combined width of a flex row is 12. If items in a row go above that, be sure to set <code>wrap</code> on
                the container to enable line wrapping.
            </ComponentExample>

            <ComponentExample title="Item Offsets" examplePath="atoms/Flex/Items/FlexExampleItemOffset">
                Items can have different offsets that work similar like column widths.
            </ComponentExample>

            <ComponentExample
                title="Responsive Item Widths"
                examplePath="atoms/Flex/Items/FlexExampleItemWidthResponsive"
            >
                Items can have different widths for different breakpoints.
                <br />
                You need to provide a default value that is applied regardless of the current breakpoint. Then you can
                customize the behaviour by adding values for the breakpoints <code>xs, s, m and l</code>. Once set, the
                behaviour is applied for all sizes larger than the breakpoint, until another definition sets another
                value.
                <br />
                You can use this to build responsive layouts. Try this example in fullscreen and resize your browser!
            </ComponentExample>

            <ComponentExample
                title="Responsive Item Offset"
                examplePath="atoms/Flex/Items/FlexExampleItemOffsetResponsive"
            >
                Just like with item widths, you can specify different offsets for different breakpoints.
            </ComponentExample>

            <ComponentExample title="Align Cross Axis" examplePath="atoms/Flex/Items/FlexExampleAlignCrossAxis">
                You can override the cross axis alignment for individual flex items. Note that float, clear and
                vertical-align have no effect on a flex item.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Items
