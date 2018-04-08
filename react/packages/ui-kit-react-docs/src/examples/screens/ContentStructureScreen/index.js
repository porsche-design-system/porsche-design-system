import React from "react"
import ComponentExample from "src/app/Components/ComponentDoc/ComponentExample/index"
import ExampleSection from "src/app/Components/ComponentDoc/ExampleSection"

const ContentStructureScreenExamples = () => {
    return (
        <div>
            <ExampleSection title="">
                <ComponentExample
                    title="Content Structure Example"
                    description={"This screen visualizes the basic structuring of pages with corresponding content elements (views, areas, organisms)"}
                    examplePath="screens/ContentStructureScreen/ContentStructureScreenExample"
                />
            </ExampleSection>
        </div>
    )
}

export default ContentStructureScreenExamples
