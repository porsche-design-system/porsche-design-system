import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => { return { height: "50px", minWidth: "100px", backgroundColor: color, marginBottom: "8px" } }

const FlexContainerExampleGap = () => {
    return (
        <Flex gap={6} wrap>
            <div>
                <div style={itemStyle("Turquoise")} />
            </div>
            <div>
                <div style={{ ...itemStyle("DeepSkyBlue"), width: "300px" }} />
            </div>
            <div>
                <div style={itemStyle("DeepPink")} />
            </div>
            <div>
                <div style={itemStyle("Orange")} />
            </div>
        </Flex>
    )
}

export default FlexContainerExampleGap
