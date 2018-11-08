import React from "react"
import { Input, Grid } from "@porsche/ui-kit-react"

const InputExampleTypesNoPlaceholder = () => {
    return (
        <Grid>
            <Grid.Child size={4}>
                <Input />
            </Grid.Child>

            <Grid.Child size={4}>
                <Input basic icon="magnify_glass" />
            </Grid.Child>

            <Grid.Child size={4}>
                <Input basic unit="km" />
            </Grid.Child>
        </Grid>
    )
}

export default InputExampleTypesNoPlaceholder
