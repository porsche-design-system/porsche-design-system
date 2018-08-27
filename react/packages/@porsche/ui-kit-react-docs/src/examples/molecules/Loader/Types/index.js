import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const LoaderExampleTypes = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Default Loader" examplePath="molecules/Loader/Types/LoaderExampleBasic">
                The default loader.
            </ComponentExample>

            <ComponentExample title="Size" examplePath="molecules/Loader/Types/LoaderExampleSize">
                A loader can have different sizes.
            </ComponentExample>

            <ComponentExample title="Inverted" examplePath="molecules/Loader/Types/LoaderExampleInverted">
                A loader can be inverted to be used on darker backgrounds.
            </ComponentExample>
        </ExampleSection>
    )
}

export default LoaderExampleTypes
