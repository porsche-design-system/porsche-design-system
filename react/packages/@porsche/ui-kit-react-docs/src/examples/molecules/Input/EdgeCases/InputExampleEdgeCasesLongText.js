import React from "react"
import { Input, Grid } from "@porsche/ui-kit-react"

const InputExampleEdgeCasesLongText = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <Input placeholder="Floating Label Floating Label Floating Label Floating Label" />
            </Grid.Child>

            <Grid.Child size={3}>
                <Input
                    placeholder="Floating Label Floating Label Floating Label Floating Label"
                    value="Value Value Value Value Value Value Value Value Value"
                    onChange={() => {}}
                />
            </Grid.Child>

            <Grid.Child size={3}>
                <Input basic placeholder="Placeholder Placeholder Placeholder Placeholder Placeholder" />
            </Grid.Child>

            <Grid.Child size={3}>
                <Input
                    basic
                    placeholder="Placeholder Placeholder Placeholder Placeholder Placeholder"
                    value="Value Value Value Value Value Value Value Value Value"
                    onChange={() => {}}
                />
            </Grid.Child>
        </Grid>
    )
}

export default InputExampleEdgeCasesLongText
