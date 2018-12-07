import React from "react"
import { Input, Grid } from "@porsche/ui-kit-react"

const InputExampleTypesError = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <Input disabled placeholder="Floating Label" />
            </Grid.Child>

            <Grid.Child size={3}>
                <Input disabled placeholder="Floating Label" value="Value" />
            </Grid.Child>

            <Grid.Child size={3}>
                <Input disabled placeholder="Placeholder" basic />
            </Grid.Child>

            <Grid.Child size={3}>
                <Input disabled placeholder="Placeholder" basic value="Value" icon="cancel" />
            </Grid.Child>
        </Grid>
    )
}

export default InputExampleTypesError
