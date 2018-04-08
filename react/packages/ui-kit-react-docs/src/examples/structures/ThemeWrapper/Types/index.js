import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const ThemeWrapperTypes = () => {
    return (
        <ExampleSection title="Types">

            <ComponentExample
                title="Theme Wrapper type Light"
                examplePath="structures/ThemeWrapper/Types/ThemeWrapperExampleLight"
            >
            A simple wrapper for bright background theming.
            </ComponentExample>

            <ComponentExample
                title="Theme Wrapper type Dark"
                examplePath="structures/ThemeWrapper/Types/ThemeWrapperExampleDark"
            >
            A simple wrapper for dark background theming.
            </ComponentExample>

            <ComponentExample
                title="Theme Wrapper type Transparent"
                examplePath="structures/ThemeWrapper/Types/ThemeWrapperExampleTransparent"
            >
.            A simple wrapper for transparent background theming.
            </ComponentExample>
        </ExampleSection>
    )
}

export default ThemeWrapperTypes
