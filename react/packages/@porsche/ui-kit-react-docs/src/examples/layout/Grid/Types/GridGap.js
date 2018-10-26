import React from "react"
import { Spacing, Grid } from "@porsche/ui-kit-react"

const itemStyle = {
    height: "20px",
    width: "100%",
    backgroundColor: "DeepSkyBlue",
    marginBottom: "8px",
    color: "white",
    textAlign: "center"
}

const GridGap = () => {
    return (
        <React.Fragment>
            <h2 className="-pui-text-size-copy">normal (default)</h2>
            <Spacing marginTop={12} marginBottom={30}>
                <Grid gap="normal">
                    <Grid.Child size={4}>
                        <div style={itemStyle}>1</div>
                    </Grid.Child>
                    <Grid.Child size={4}>
                        <div style={itemStyle}>2</div>
                    </Grid.Child>
                    <Grid.Child size={4}>
                        <div style={itemStyle}>3</div>
                    </Grid.Child>
                </Grid>
            </Spacing>

            <h2 className="-pui-text-size-copy">zero</h2>
            <Spacing marginTop={12}>
                <Grid gap="zero">
                    <Grid.Child size={4}>
                        <div style={itemStyle}>1</div>
                    </Grid.Child>
                    <Grid.Child size={4}>
                        <div style={itemStyle}>2</div>
                    </Grid.Child>
                    <Grid.Child size={4}>
                        <div style={itemStyle}>3</div>
                    </Grid.Child>
                </Grid>
            </Spacing>
        </React.Fragment>
    )
}

export default GridGap
