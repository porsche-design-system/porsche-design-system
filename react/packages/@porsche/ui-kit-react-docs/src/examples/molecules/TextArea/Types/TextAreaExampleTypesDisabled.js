import React from "react"
import { TextArea, Grid } from "@porsche/ui-kit-react"

const TextAreaExampleTypesDisabled = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <TextArea disabled placeholder="Floating Label" />
            </Grid.Child>

            <Grid.Child size={3}>
                <TextArea disabled placeholder="Floating Label" value="Value" onChange={() => {}} />
            </Grid.Child>

            <Grid.Child size={3}>
                <TextArea disabled placeholder="Placeholder" basic />
            </Grid.Child>

            <Grid.Child size={3}>
                <TextArea disabled placeholder="Placeholder" basic value="Value" onChange={() => {}} />
            </Grid.Child>
        </Grid>
    )
}

export default TextAreaExampleTypesDisabled
