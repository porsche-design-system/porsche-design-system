import React from "react"
import { TextArea, Grid } from "@porsche/ui-kit-react"

const TextAreaExampleTypesAutofocus = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <TextArea autofocus placeholder="Floating Label" />
            </Grid.Child>
        </Grid>
    )
}

export default TextAreaExampleTypesAutofocus
