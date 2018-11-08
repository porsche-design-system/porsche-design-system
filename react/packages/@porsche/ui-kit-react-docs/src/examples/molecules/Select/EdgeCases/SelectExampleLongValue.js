import React from "react"
import { Grid, Select } from "@porsche/ui-kit-react"

const data = [
    { value: "WithoutWhitespace", label: "WithoutWhitespaceWithoutWhitespaceWithoutWhitespaceWithoutWhitespace" },
    {
        value: "With Whitespace",
        label: "With Whitespace With Whitespace With Whitespace With Whitespace With Whitespace"
    }
]

const SelectExampleLongValue = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <Select options={data} value={data[0].value} />
            </Grid.Child>

            <Grid.Child size={3}>
                <Select options={data} value={data[1].value} />
            </Grid.Child>

            <Grid.Child size={3}>
                <Select multi options={data} value={data[0].value} />
            </Grid.Child>

            <Grid.Child size={3}>
                <Select multi options={data} value={data[1].value} />
            </Grid.Child>
        </Grid>
    )
}

export default SelectExampleLongValue
