import React from "react"
import * as _ from "lodash"

import { Flex } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }
const itemStyle = (color) => {
    return { height: "12px", backgroundColor: color }
}

const FlexExampleItemWidthSpecific = () => {
    return (
        <div>
            {_.times(11, (i) => {
                return (
                    <Flex key={i} gap={"grid"} style={containerStyle}>
                        <Flex.Item width={i + 1}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Flex.Item>
                        <Flex.Item width={11 - i}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Flex.Item>
                    </Flex>
                )
            })}
        </div>
    )
}

export default FlexExampleItemWidthSpecific
