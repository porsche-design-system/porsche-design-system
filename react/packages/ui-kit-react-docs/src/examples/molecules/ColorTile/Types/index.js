import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">

            <ComponentExample
                title="Primary Color"
                examplePath="molecules/ColorTile/Types/ColorTileExampleBasics"
            >
                You can display a single color and some children.
            </ComponentExample>

            <ComponentExample
                title="Secondary Color"
                examplePath="molecules/ColorTile/Types/ColorTileExampleSecondaryColor"
            >
                Additionally, a color tile can show a secondary color as well.
            </ComponentExample>

            <ComponentExample
                title="Sizes"
                examplePath="molecules/ColorTile/Types/ColorTileExampleSizes"
            >
                The tile can have different sizes.
            </ComponentExample>

            <ComponentExample
                title="Sizes"
                examplePath="molecules/ColorTile/Types/ColorTileExampleCircle"
            >
                It can also be round for dramatic effect.
            </ComponentExample>

        </ExampleSection>
    )
}

export default Types
