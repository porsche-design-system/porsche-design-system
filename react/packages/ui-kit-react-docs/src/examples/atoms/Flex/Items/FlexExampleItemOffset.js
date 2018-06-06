import React from "react"
import * as _ from "lodash"

import { Flex } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }
const itemStyle = (color) => {
    return { height: "12px", backgroundColor: color }
}

const FlexExampleItemOffset = () => {
    return (
        <div>
            {_.times(12, (i) => {
                return (
                    <Flex key={i} gap={"grid"} style={containerStyle}>
                        <Flex.Item offset={i} width={1}>
                            <div style={itemStyle("DeepSkyBlue")} />
                        </Flex.Item>
                    </Flex>
                )
            })}
        </div>
    )
}

export default FlexExampleItemOffset
