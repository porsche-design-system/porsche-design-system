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

            <ComponentExample title="Error" examplePath="molecules/Button/Types/ButtonExampleTypesError">
                A button can represent an error.
            </ComponentExample>

            <ComponentExample title="Show Content" examplePath="molecules/Button/Types/ButtonExampleTypesShowContent">
                A button can only show its content starting from a specific breakpoint. Below that, only the icon is
                shown.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
