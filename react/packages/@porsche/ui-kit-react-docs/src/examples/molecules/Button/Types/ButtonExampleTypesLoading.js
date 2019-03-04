import React from "react"
import { Spacing, Button, Grid } from "@porsche/ui-kit-react"

const ButtonExampleTypesLoading = () => {
    return (
        <div>
            <Grid>
                <Grid.Child size={3}>
                    <Button loading>Regular Button</Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button loading type="highlight">
                        Highlight Button
                    </Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button loading type="sales">
                        Sales Button
                    </Button>
                </Grid.Child>
            </Grid>

            <Spacing paddingTop={18}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button loading type="ghost">
                            Ghost Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button loading type="sales-ghost">
                            Sales-Ghost Button
                        </Button>
                    </Grid.Child>
                </Grid>
            </Spacing>

            <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button loading disabled inverted>
                            Regular Inverted Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button loading disabled inverted type="highlight">
                            Highlight Inverted Button
                        </Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button loading disabled inverted type="sales">
                            Sales Inverted Button
                        </Button>
                    </Grid.Child>
                </Grid>
                <Spacing marginTop={18}>
                    <Grid>
                        <Grid.Child size={3}>
                            <Button loading disabled inverted type="ghost">
                                Ghost Inverted Button
                            </Button>
                        </Grid.Child>

                        <Grid.Child size={3}>
                            <Button loading disabled inverted type="sales-ghost">
                                Sales-Ghost Inverted Button
                            </Button>
                        </Grid.Child>
                    </Grid>
                </Spacing>
            </div>
        </div>
    )
}

export default ButtonExampleTypesLoading
