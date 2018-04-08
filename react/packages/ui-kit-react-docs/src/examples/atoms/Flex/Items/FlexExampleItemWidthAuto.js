import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => { return { height: "50px", backgroundColor: color } }

const FlexExampleItemWidthAuto = () => {
    return (
        <Flex gap={"grid"}>
            <Flex.Item width={"auto"}>
                <div style={itemStyle("Turquoise")}>
                    An element
                </div>
            </Flex.Item>
            <Flex.Item width={"auto"}>
                <div style={itemStyle("DeepSkyBlue")}>
                    An element with a little more text
                </div>
            </Flex.Item>
            <Flex.Item width={"auto"}>
                <div style={itemStyle("DeepPink")} />
            </Flex.Item>
            <Flex.Item width={"auto"}>
                <div style={itemStyle("Orange")} />
            </Flex.Item>
        </Flex>
    )
}

export default FlexExampleItemWidthAuto
