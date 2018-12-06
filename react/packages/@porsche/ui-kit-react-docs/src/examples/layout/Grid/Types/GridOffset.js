import React from "react"
import * as _ from "lodash"
import { Grid } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }
const itemStyle = (color) => {
    return { height: "12px", backgroundColor: color }
}

const GridOffset = () => {
    return (
        <React.Fragment>
            {_.times(11, (i) => {
                return (
                    <Grid key={i} style={containerStyle}>
                        <Grid.Child offset={i + 1} size={11 - i}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Grid.Child>
                    </Grid>
                )
            })}
        </React.Fragment>
    )
}

export default GridOffset
