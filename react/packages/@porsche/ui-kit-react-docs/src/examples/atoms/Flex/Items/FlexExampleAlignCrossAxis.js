import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "16px" }
const alignedItemStyle = { height: "20px", backgroundColor: "DeepPink" }
const defaultItemStyle = (height) => {
    return { height, backgroundColor: "DeepSkyBlue" }
}

const FlexWithAlignCrossAxis = (alignCrossAxis) => {
    return (
        <div>
            <p>{alignCrossAxis}:</p>
            <Flex alignMainAxis="space-evenly" alignCrossAxis="center" gap={"grid"} style={containerStyle}>
                <Flex.Item width={3}>
                    <div style={defaultItemStyle("20px")} />
                </Flex.Item>
                <Flex.Item width={3}>
                    <div style={defaultItemStyle("50px")} />
                </Flex.Item>
                <Flex.Item alignCrossAxis={alignCrossAxis} width={3}>
                    <div style={alignedItemStyle} />
                </Flex.Item>
                <Flex.Item width={3}>
                    <div style={defaultItemStyle("50px")} />
                </Flex.Item>
            </Flex>
        </div>
    )
}

const FlexExampleAlignCrossAxis = () => {
    return (
        <div>
            {FlexWithAlignCrossAxis("start")}
            {FlexWithAlignCrossAxis("center")}
            {FlexWithAlignCrossAxis("end")}
        </div>
    )
}

export default FlexExampleAlignCrossAxis
