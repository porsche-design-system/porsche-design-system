import React from "react"
import { Input, Grid } from "@porsche/ui-kit-react"

const InputExampleEdgeCasesIconClickHandler = () => {
    const handleOnIconClicked = (event) => {
        alert("Icon clicked...")
    }
    return (
        <Grid>
            <Grid.Child size={3}>
                <Input icon="calendar" onIconClicked={handleOnIconClicked} />
            </Grid.Child>
        </Grid>
    )
}

export default InputExampleEdgeCasesIconClickHandler
