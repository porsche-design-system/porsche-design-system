import React from "react"
import { Grid, Select } from "@porsche/ui-kit-react"

const data = [
    {
        label: "Group with Whitespace Group with Whitespace",
        options: [
            {
                value: "WithoutWhitespace1",
                label: "WithoutWhitespaceWithoutWhitespaceWithoutWhitespaceWithoutWhitespace"
            },
            {
                value: "With Whitespace1",
                label: "With Whitespace With Whitespace With Whitespace With Whitespace With Whitespace"
            }
        ]
    },
    {
        label: "GroupWithoutWhitespaceGroupWithoutWhitespace",
        options: [
            {
                value: "WithoutWhitespace2",
                label: "WithoutWhitespaceWithoutWhitespaceWithoutWhitespaceWithoutWhitespace"
            },
            {
                value: "With Whitespace2",
                label: "With Whitespace With Whitespace With Whitespace With Whitespace With Whitespace"
            }
        ]
    }
]

const SelectExampleLongValueGrouped = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <Select options={data} value={data[0].options[0].value} />
            </Grid.Child>

            <Grid.Child size={3}>
                <Select options={data} value={data[0].options[1].value} />
            </Grid.Child>

            <Grid.Child size={3}>
                <Select multi options={data} value={data[0].options[0].value} />
            </Grid.Child>

            <Grid.Child size={3}>
                <Select multi options={data} value={data[0].options[1].value} />
            </Grid.Child>
        </Grid>
    )
}

export default SelectExampleLongValueGrouped
