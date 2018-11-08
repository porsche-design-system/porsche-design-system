import React from "react"
import { Spacing, Button, Grid } from "@porsche/ui-kit-react"

const ButtonExampleTypes = () => {
    return (
        <div>
            <Grid>
                <Grid.Child size={3}>
                    <Button type="default">Default Button</Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button type="red">Red Button</Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button type="blue">Blue Button</Button>
                </Grid.Child>

                <Grid.Child size={3}>
                    <Button type="black">Black Button</Button>
                </Grid.Child>
            </Grid>

            <Spacing paddingTop={18}>
                <Grid>
                    <Grid.Child size={3}>
                        <Button type="acid-green">Acid-Green Button</Button>
                    </Grid.Child>

                    <Grid.Child size={3}>
                        <Button type="ghost">Ghost Button</Button>
                    </Grid.Child>
                </Grid>
            </Spacing>

            <Grid>
                <Grid.Child size={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button type="ghost-inverted">Ghost Inverted Button</Button>
                    </div>
                </Grid.Child>
            </Grid>
        </div>
    )
}

export default ButtonExampleTypes
