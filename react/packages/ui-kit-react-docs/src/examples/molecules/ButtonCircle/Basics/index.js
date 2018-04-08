import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Basics = () => {
    return (
        <ExampleSection title="Basics">
            <ComponentExample
                title="Basic Circle Button"
                examplePath="molecules/ButtonCircle/Basics/ButtonCircleExampleSimple"
            >
                Display a circle button with an icon.
            </ComponentExample>

            <ComponentExample
                title="Align"
                examplePath="molecules/ButtonCircle/Basics/ButtonCircleExampleAlign"
            >
                You can switch the alignment of the icon and text.
            </ComponentExample>

            <ComponentExample
                title="Disabled"
                examplePath="molecules/ButtonCircle/Basics/ButtonCircleExampleDisabled"
            >
                You can disable the circle button. No <code>onClick</code> will trigger when this property is set.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Basics
