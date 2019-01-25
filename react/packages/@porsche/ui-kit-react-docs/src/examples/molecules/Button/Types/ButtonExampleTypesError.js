import React from "react"
import { Spacing, Button, Grid } from "@porsche/ui-kit-react"

const ButtonExampleTypesError = () => {
    return (
        <div>
            <Grid>
                <Grid.Child size={3}>
                    <Button error type="default">
                        Default Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button error type="red">
                        Red Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button error type="blue">
                        Blue Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button error type="black">
                        Black Button
                    </Button>
                </Grid.Child>
            </Grid>

            <Spacing paddingTop={18}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button error type="acid-green">
                            Acid-Green Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button error type="ghost">
                            Ghost Button
                        </Button>
                    </Grid.Child>
                </Grid>
            </Spacing>

            <Grid>
                <Grid.Child size={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button error type="ghost-inverted">
                            Ghost Inverted Button
                        </Button>
                    </div>
                </Grid.Child>
            </Grid>
        </div>
    )
}

export default ButtonExampleTypesError
