import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const containerStyle = { backgroundColor: "WhiteSmoke", marginBottom: "16px" }

const style = (height, color) => { return { height, width: "150px", backgroundColor: color } }

const FlexAlignCrossAxis = (alignCrossAxis) => {
    return (
        <div>
            <p>{alignCrossAxis}:</p>
            <Flex alignCrossAxis={alignCrossAxis} style={containerStyle}>
                <div style={style("20px", "DeepPink")} />
                <div style={style("50px", "DeepSkyBlue")} />
                <div style={style("30px", "Turquoise")} />
            </Flex>
        </div>
    )
}

const FlexContainerExampleCrossAxis = () => {
    return (
        <div>
            { FlexAlignCrossAxis("start") }
            { FlexAlignCrossAxis("center") }
            { FlexAlignCrossAxis("end") }
        </div>
    )
}

export default FlexContainerExampleCrossAxis
