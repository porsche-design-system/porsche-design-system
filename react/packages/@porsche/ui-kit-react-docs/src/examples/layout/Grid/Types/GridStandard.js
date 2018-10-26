import React from "react"
import * as _ from "lodash"
import { Grid } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }
const itemStyle = (color) => {
    return { height: "12px", backgroundColor: color }
}

const GridStandard = () => {
    return (
        <React.Fragment>
            <Grid style={containerStyle}>
                <Grid.Child size={12}>
                    <div style={itemStyle("DeepSkyBlue")} />
                </Grid.Child>
            </Grid>
            {_.times(11, (i) => {
                return (
                    <Grid key={i} style={containerStyle}>
                        <Grid.Child size={i + 1}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Grid.Child>
                        <Grid.Child size={11 - i}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Grid.Child>
                    </Grid>
                )
            })}
        </React.Fragment>
    )
}

export default GridStandard
