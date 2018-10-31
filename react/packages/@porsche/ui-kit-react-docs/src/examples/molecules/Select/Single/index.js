import React from "react"
import ComponentExample from "src/components/ComponentExample"
import ExampleSection from "src/components/ExampleSection"

const SelectExampleSingle = () => {
    return (
        <ExampleSection title="Single Select">
            <ComponentExample
                title="Select with Floating Placeholder"
                examplePath="molecules/Select/Single/SelectExampleSingle"
            >
                A simple select for single values with an onChange handler and a floating placeholder.
            </ComponentExample>

            <ComponentExample
                title="Select with Regular Placeholder"
                examplePath="molecules/Select/Single/SelectExampleSingleBasic"
            >
                A simple select for single values with an onChange handler and a regular placeholder.
            </ComponentExample>

            <ComponentExample title="Clearable" examplePath="molecules/Select/Single/SelectExampleSingleClearable">
                By default, a select will show an icon to clear its values. You can disable this behaviour with the{" "}
                <code>clearable</code> prop.
            </ComponentExample>

            <ComponentExample title="Searchable" examplePath="molecules/Select/Single/SelectExampleSingleSearchable">
                Single selects are searchable by default. You can disable the filtering of options, but only for single
                selects. Multi selects are always searchable.
            </ComponentExample>

            <ComponentExample title="Disabled" examplePath="molecules/Select/Single/SelectExampleSingleDisabled" />

            <ComponentExample title="Error" examplePath="molecules/Select/Single/SelectExampleSingleError" />

            <ComponentExample title="Loading" examplePath="molecules/Select/Single/SelectExampleSingleLoading" />

            <ComponentExample title="Search" examplePath="molecules/Select/Single/SelectExampleSingleOnSearchChanged">
                The select component can also be used to fetch options dynamically by connecting yourself to the
                onSearchChanged property.
            </ComponentExample>
        </ExampleSection>
    )
}

export default SelectExampleSingle
