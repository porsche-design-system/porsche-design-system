import React from "react"
import { Grid, Spacing } from "@porsche/ui-kit-react"

const boxStyles = { backgroundColor: "#246A97" }

const SpacingExampleResponsive = () => {
    return (
        <Grid>
            <Grid.Child size={1}>
                <Spacing paddingBottom={"a"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Grid.Child>

            <Grid.Child size={1}>
                <Spacing paddingBottom={"b"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Grid.Child>

            <Grid.Child size={1}>
                <Spacing paddingBottom={"c"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Grid.Child>

            <Grid.Child size={1}>
                <Spacing paddingBottom={"d"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Grid.Child>

            <Grid.Child size={1}>
                <Spacing paddingBottom={"e"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Grid.Child>

            <Grid.Child size={1}>
                <Spacing paddingBottom={"f"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Grid.Child>
        </Grid>
    )
}

export default SpacingExampleResponsive
