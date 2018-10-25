import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"
import React from "react"

const Types = () => {
    return (
        <ExampleSection title="Types">
            <ComponentExample title="Text Styles" examplePath="atoms/Text/Types/TextExampleTypes">
                The text component supports different text styles.
            </ComponentExample>

            <ComponentExample title="Text Bold Styles" examplePath="atoms/Text/Types/TextExampleBoldTypes">
                The text component also supports bold as a text style. They shouldn't be used as long as they aren't CI
                compatible.
            </ComponentExample>

            <ComponentExample title="Text Colors" examplePath="atoms/Text/Types/TextExampleColors">
                It also supports lots of different colors.
            </ComponentExample>

            <ComponentExample title="Text Alignment" examplePath="atoms/Text/Types/TextExampleAlign">
                The text can be aligned left, center or right.
            </ComponentExample>
        </ExampleSection>
    )
}

export default Types
