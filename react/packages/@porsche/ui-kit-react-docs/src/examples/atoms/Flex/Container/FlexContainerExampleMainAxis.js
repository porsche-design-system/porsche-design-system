import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const containerStyle = { maxWidth: "600px", width: "100%", backgroundColor: "WhiteSmoke", marginBottom: "16px" }

const style = (width, color) => {
    return { width, height: "20px", backgroundColor: color }
}

const FlexAlignMainAxis = (alignMainAxis) => {
    return (
        <div>
            <p>{alignMainAxis}:</p>
            <Flex alignMainAxis={alignMainAxis} style={containerStyle}>
                <div style={style("60px", "DeepPink")} />
                <div style={style("150px", "DeepSkyBlue")} />
                <div style={style("120px", "Turquoise")} />
            </Flex>
        </div>
    )
}

const FlexContainerExampleMainAxis = () => {
    return (
        <div>
            {FlexAlignMainAxis("start")}
            {FlexAlignMainAxis("center")}
            {FlexAlignMainAxis("end")}
            {FlexAlignMainAxis("space-between")}
            {FlexAlignMainAxis("space-around")}
            {FlexAlignMainAxis("space-evenly")}
        </div>
    )
}

export default FlexContainerExampleMainAxis
