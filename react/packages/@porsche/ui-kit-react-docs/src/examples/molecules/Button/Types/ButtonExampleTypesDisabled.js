import React from "react"
import { Spacing, Button, Grid } from "@porsche/ui-kit-react"

const ButtonExampleTypesDisabled = () => {
    return (
        <div>
            <Grid>
                <Grid.Child size={3}>
                    <Button disabled type="default">
                        Default Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button disabled type="red">
                        Red Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button disabled type="blue">
                        Blue Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button disabled type="black">
                        Black Button
                    </Button>
                </Grid.Child>
            </Grid>

            <Spacing paddingTop={18}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button disabled type="acid-green">
                            Acid-Green Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button disabled type="ghost">
                            Ghost Button
                        </Button>
                    </Grid.Child>
                </Grid>
            </Spacing>

            <Grid>
                <Grid.Child size={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button disabled type="ghost-inverted">
                            Ghost Inverted Button
                        </Button>
                    </div>
                </Grid.Child>
            </Grid>
        </div>
    )
}

export default ButtonExampleTypesDisabled
