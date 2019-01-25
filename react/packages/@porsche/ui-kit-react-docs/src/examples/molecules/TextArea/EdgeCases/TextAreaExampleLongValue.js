import React from "react"
import { TextArea, Grid } from "@porsche/ui-kit-react"

const TextAreaExampleTypesLongValue = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <TextArea
                    placeholder="Placeholder"
                    value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                />
            </Grid.Child>
        </Grid>
    )
}

export default TextAreaExampleTypesLongValue
