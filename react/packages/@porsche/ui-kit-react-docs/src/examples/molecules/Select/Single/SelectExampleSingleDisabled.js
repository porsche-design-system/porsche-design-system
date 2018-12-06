import React from "react"
import { Grid, Select } from "@porsche/ui-kit-react"

const data = [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
    { value: "four", label: "Four" },
    { value: "five", label: "Five" },
    { value: "six", label: "Six" },
    { value: "seven", label: "Seven" },
    { value: "eight", label: "Eight" }
]

const SelectExampleSingleDisabled = () => {
    return (
        <Grid>
            <Grid.Child size={6}>
                <Select disabled options={data} value={null} />
            </Grid.Child>

            <Grid.Child size={6}>
                <Select disabled options={data} value={data[3].value} />
            </Grid.Child>
        </Grid>
    )
}

export default SelectExampleSingleDisabled
