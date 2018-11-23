import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Basic" examplePath="molecules/Tab/Types/TabExampleBasic">
                A simple Tab component
            </ComponentExample>
            <ComponentExample title="Mini" examplePath="molecules/Tab/Types/TabExampleMini">
                The Tab component with a smaller dimension
            </ComponentExample>
            <ComponentExample title="Alignment" examplePath="molecules/Tab/Types/TabExampleAlignment">
                The Tab component left aligned
            </ComponentExample>
            <ComponentExample title="Activation" examplePath="molecules/Tab/Types/TabExampleActivation">
                The Tab component with the second tab activated
            </ComponentExample>
            <ComponentExample title="With no divider" examplePath="molecules/Tab/Types/TabExampleNoDivider">
                The Tab component with no divider displayed
            </ComponentExample>
            <ComponentExample
                title="Tab change handled outside of component"
                examplePath="molecules/Tab/Types/TabExampleHandleChange"
            >
                An example that handles the content change outside of the component
            </ComponentExample>
        </ExampleSection>
    )
}

export { Types }
