import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => {
    return { height: "50px", backgroundColor: color }
}

const FlexExampleItemWidth = () => {
    return (
        <Flex gap={"grid"}>
            <Flex.Item>
                <div style={itemStyle("Turquoise")} />
            </Flex.Item>
            <Flex.Item>
                <div style={itemStyle("DeepSkyBlue")} />
            </Flex.Item>
            <Flex.Item>
                <div style={itemStyle("DeepPink")} />
            </Flex.Item>
            <Flex.Item>
                <div style={itemStyle("Orange")} />
            </Flex.Item>
        </Flex>
    )
}

export default FlexExampleItemWidth
