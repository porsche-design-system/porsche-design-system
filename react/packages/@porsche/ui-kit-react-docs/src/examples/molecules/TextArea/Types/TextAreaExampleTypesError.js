import React from "react"
import { TextArea, Grid } from "@porsche/ui-kit-react"

const TextAreaExampleTypesError = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <TextArea error placeholder="Floating Label" />
            </Grid.Child>

            <Grid.Child size={3}>
                <TextArea error placeholder="Floating Label" value="Value" onChange={() => {}} />
            </Grid.Child>

            <Grid.Child size={3}>
                <TextArea error placeholder="Placeholder" basic />
            </Grid.Child>

            <Grid.Child size={3}>
                <TextArea error placeholder="Placeholder" basic value="Value" onChange={() => {}} />
            </Grid.Child>
        </Grid>
    )
}

export default TextAreaExampleTypesError
