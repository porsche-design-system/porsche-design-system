import React from "react"
import * as _ from "lodash"
import { Grid } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }
const itemStyle = (color) => {
    return { height: "12px", backgroundColor: color }
}

const GridOffset = () => {
    return (
        <div>
            {_.times(11, (i) => {
                return (
                    <Grid key={i} style={containerStyle}>
                        <Grid.Child offset={i + 1} width={11 - i}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Grid.Child>
                    </Grid>
                )
            })}
        </div>
    )
}

export default GridOffset
