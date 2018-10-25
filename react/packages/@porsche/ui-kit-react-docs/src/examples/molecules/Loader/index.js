import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import { storiesOf, TYPE } from "src/app/stories"

storiesOf(TYPE.MOLECULE, "Loader", [], module)
    .addPropsTable("Loader.Mask")
    .add(() => (
        <React.Fragment>
            <ExampleSection title="Types">
                <ComponentExample title="Default Loader" examplePath="molecules/Loader/LoaderExampleBasic">
                    The default loader.
                </ComponentExample>

                <ComponentExample title="Size" examplePath="molecules/Loader/LoaderExampleSize">
                    A loader can have different sizes.
                </ComponentExample>

                <ComponentExample title="Inverted" examplePath="molecules/Loader/LoaderExampleInverted">
                    A loader can be inverted to be used on darker backgrounds.
                </ComponentExample>
            </ExampleSection>

            <ExampleSection title="Loader Mask">
                <ComponentExample title="Default Loader Mask" examplePath="molecules/Loader/LoaderExampleLoaderMask">
                    Using <code>Loader.Mask</code> you can display the contents of a container with a translucent
                    overlay and centered loader. The mask is as big as its parent container. If <code>loading</code> is{" "}
                    <code>false</code> the children are rendered directly without any wrapper components.
                </ComponentExample>
            </ExampleSection>
        </React.Fragment>
    ))
