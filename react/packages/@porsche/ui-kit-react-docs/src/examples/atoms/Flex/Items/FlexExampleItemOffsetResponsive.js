import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => {
    return { height: "20px", backgroundColor: color, marginBottom: "12px" }
}

const FlexExampleItemOffsetResponsive = () => {
    return (
        <Flex wrap gap={"grid"}>
            <Flex.Item width={{ base: 12, s: 6, l: 4 }} offset={{ base: 0, s: 3, l: 4 }}>
                <div style={itemStyle("DeepSkyBlue")} />
            </Flex.Item>
        </Flex>
    )
}

export default FlexExampleItemOffsetResponsive
