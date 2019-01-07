import React from "react"
import { Input, Spacing, Grid } from "@porsche/ui-kit-react"

const InputExampleTypesErrorDisabled = () => {
    return (
        <div>
            <Grid>
                <Grid.Child size={3}>
                    <Input error disabled placeholder="Floating Label" />
                </Grid.Child>

                <Grid.Child size={3}>
                    <Input error disabled placeholder="Floating Label" value="Value" />
                </Grid.Child>

                <Grid.Child size={3}>
                    <Input error disabled placeholder="Placeholder" basic />
                </Grid.Child>

                <Grid.Child size={3}>
                    <Input error disabled placeholder="Placeholder" basic value="Value" />
                </Grid.Child>
            </Grid>

            <Spacing marginTop={24}>
                <Grid>
                    <Grid.Child size={3}>
                        <Input error disabled icon="cancel" placeholder="Floating Label" />
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Input error disabled icon="cancel" basic placeholder="Placeholder" />
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Input error disabled unit="km" placeholder="Floating Label" />
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Input error disabled unit="km" basic placeholder="Placeholder" />
                    </Grid.Child>
                </Grid>
            </Spacing>
        </div>
    )
}

export default InputExampleTypesErrorDisabled
