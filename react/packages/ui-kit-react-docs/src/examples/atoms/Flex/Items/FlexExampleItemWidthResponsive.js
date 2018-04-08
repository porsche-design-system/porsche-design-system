import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => { return { height: "50px", backgroundColor: color, marginBottom: "12px" } }

const FlexExampleItemWidthResponsive = () => {
    return (
        <Flex wrap gap={"grid"}>
            <Flex.Item width={{ base: 12, l: 4 }}>
                <div style={itemStyle("DeepSkyBlue")} />
            </Flex.Item>
            <Flex.Item width={{ base: 12, s: 6, l: 4 }}>
                <div style={itemStyle("DeepPink")} />
            </Flex.Item>
            <Flex.Item width={{ base: 12, s: 6, l: 4 }}>
                <div style={itemStyle("Turquoise")} />
            </Flex.Item>
        </Flex>
    )
}

export default FlexExampleItemWidthResponsive
