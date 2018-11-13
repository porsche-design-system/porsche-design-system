import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => {
    return {
        height: "50px",
        backgroundColor: color,
        padding: "12px",
        color: "white"
    }
}

const FlexExampleItemWidthEqual = () => {
    return (
        <Flex gap={12}>
            <Flex.Item flex={"equal"}>
                <div style={itemStyle("DeepSkyBlue")}>An element</div>
            </Flex.Item>
            <Flex.Item flex={"equal"}>
                <div style={itemStyle("DeepSkyBlue")}>An element with a little more text</div>
            </Flex.Item>
            <Flex.Item flex={"equal"}>
                <div style={itemStyle("DeepSkyBlue")}>An element</div>
            </Flex.Item>
            <Flex.Item flex={"equal"}>
                <div style={itemStyle("DeepSkyBlue")}>An element with more content</div>
            </Flex.Item>
        </Flex>
    )
}

export default FlexExampleItemWidthEqual
