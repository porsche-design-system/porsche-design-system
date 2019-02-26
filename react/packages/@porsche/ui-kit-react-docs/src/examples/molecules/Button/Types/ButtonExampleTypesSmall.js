import React from "react"
import { Spacing, Button, Grid } from "@porsche/ui-kit-react"

const ButtonExampleTypesSmall = () => {
    return (
        <div>
            <Grid>
                <Grid.Child size={3}>
                    <Button small>Regular Button</Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button small type="highlight">
                        Highlight Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button small type="sales">
                        Sales Button
                    </Button>
                </Grid.Child>
            </Grid>

            <Spacing paddingTop={18}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button small type="ghost">
                            Ghost Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button small type="sales-ghost">
                            Sales-Ghost Button
                        </Button>
                    </Grid.Child>
                </Grid>
            </Spacing>

            <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button small inverted>
                            Regular Inverted Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button small inverted type="highlight">
                            Highlight Inverted Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button small inverted type="sales">
                            Sales Inverted Button
                        </Button>
                    </Grid.Child>
                </Grid>
                <Spacing marginTop={18}>
                    <Grid>
                        <Grid.Child size={3}>
                            <Button small inverted type="ghost">
                                Ghost Inverted Button
                            </Button>
                        </Grid.Child>

                        <Grid.Child size={3}>
                            <Button small inverted type="sales-ghost">
                                Sales-Ghost Inverted Button
                            </Button>
                        </Grid.Child>
                    </Grid>
                </Spacing>
            </div>
        </div>
    )
}

export default ButtonExampleTypesSmall
