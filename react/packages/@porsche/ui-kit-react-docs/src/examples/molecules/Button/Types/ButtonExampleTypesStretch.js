import React from "react"
import { Spacing, Button, Grid } from "@porsche/ui-kit-react"

const ButtonExampleTypesStretch = () => {
    return (
        <div>
            <Grid>
                <Grid.Child size={3}>
                    <Button stretch type="default">
                        Default Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button stretch type="red">
                        Red Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button stretch type="blue">
                        Blue Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button stretch type="black">
                        Black Button
                    </Button>
                </Grid.Child>
            </Grid>

            <Spacing paddingTop={18}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button stretch type="acid-green">
                            Acid-Green Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button stretch type="ghost">
                            Ghost Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button stretch centered type="default">
                            Streched and centered Button
                        </Button>
                    </Grid.Child>
                </Grid>
            </Spacing>

            <Grid>
                <Grid.Child size={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button stretch type="ghost-inverted">
                            Ghost Inverted Button
                        </Button>
                    </div>
                </Grid.Child>
            </Grid>
        </div>
    )
}

export default ButtonExampleTypesStretch
