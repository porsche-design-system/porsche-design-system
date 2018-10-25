import React from "react"
import * as _ from "lodash"
import { Grid } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }
const itemStyle = (color) => {
    return { height: "12px", backgroundColor: color }
}

const GridStandard = () => {
    return (
        <div>
            <Grid style={containerStyle}>
                <Grid.Child width={12}>
                    <div style={itemStyle("DeepSkyBlue")} />
                </Grid.Child>
            </Grid>
            {_.times(11, (i) => {
                return (
                    <Grid key={i} style={containerStyle}>
                        <Grid.Child width={i + 1}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Grid.Child>
                        <Grid.Child width={11 - i}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Grid.Child>
                    </Grid>
                )
            })}
        </div>
    )
}

export default GridStandard
