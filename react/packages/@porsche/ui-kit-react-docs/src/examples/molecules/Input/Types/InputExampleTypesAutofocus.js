import React from "react"
import { Input, Grid } from "@porsche/ui-kit-react"

const InputExampleTypesAutofocus = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <Input autofocus placeholder="Floating Label" />
            </Grid.Child>
        </Grid>
    )
}

export default InputExampleTypesAutofocus
