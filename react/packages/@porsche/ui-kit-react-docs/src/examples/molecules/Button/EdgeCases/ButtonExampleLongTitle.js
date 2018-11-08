import React from "react"
import { Button, Grid } from "@porsche/ui-kit-react"

const ButtonExampleLongTitle = () => {
    return (
        <Grid>
            <Grid.Child size={3}>
                <Button>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Grid.Child>

            <Grid.Child size={3}>
                <Button error>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Grid.Child>

            <Grid.Child size={3}>
                <Button disabled>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Grid.Child>

            <Grid.Child size={3}>
                <Button loading>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Grid.Child>
        </Grid>
    )
}

export default ButtonExampleLongTitle
