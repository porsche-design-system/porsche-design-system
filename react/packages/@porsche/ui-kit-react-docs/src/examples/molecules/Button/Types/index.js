import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Default Button" examplePath="molecules/Button/Types/ButtonExampleBasics">
                Display a button in its default style.
            </ComponentExample>

            <ComponentExample title="Button Icons" examplePath="molecules/Button/Types/ButtonExampleIcon">
                A button always needs an Icon. By default it will show an arrow, but you can customize what icon is
                shown.
            </ComponentExample>

            <ComponentExample title="Button Types" examplePath="molecules/Button/Types/ButtonExampleTypes">
                A button has different types.
            </ComponentExample>

            <ComponentExample title="Button Types Small" examplePath="molecules/Button/Types/ButtonExampleTypesSmall">
                A button can have different types and a small layout.
            </ComponentExample>

            <ComponentExample title="Stretch" examplePath="molecules/Button/Types/ButtonExampleTypesStretch">
                A button can stretch to fill the full width.
            </ComponentExample>

            <ComponentExample title="Disabled" examplePath="molecules/Button/Types/ButtonExampleTypesDisabled">
                A button can be disabled. No <code>onClick</code> will trigger when this property is set.
            </ComponentExample>

            <ComponentExample title="Loading" examplePath="molecules/Button/Types/ButtonExampleTypesLoading">
                A button can show a loading indicator. It is also automatically disabled when loading. No{" "}
                <code>onClick</code> will trigger when this property is set.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
