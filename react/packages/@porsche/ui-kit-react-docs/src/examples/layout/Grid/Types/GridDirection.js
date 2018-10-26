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

const GridDirection = () => {
    return (
        <React.Fragment>
            <h2 className="-pui-text-size-copy">row (default)</h2>
            <Spacing marginTop={12} marginBottom={30}>
                <Grid direction="row">
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

            <h2 className="-pui-text-size-copy">row-reverse</h2>
            <Spacing marginTop={12} marginBottom={30}>
                <Grid direction="row-reverse">
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

            <h2 className="-pui-text-size-copy">column</h2>
            <Spacing marginTop={12} marginBottom={30}>
                <Grid direction="column">
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

            <h2 className="-pui-text-size-copy">column-reverse</h2>
            <Spacing marginTop={12}>
                <Grid direction="column-reverse">
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

export default GridDirection
