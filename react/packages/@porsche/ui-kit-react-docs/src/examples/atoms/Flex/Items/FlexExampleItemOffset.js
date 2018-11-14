import React from "react"
import * as _ from "lodash"

import { Flex } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }

const itemStyle = (color) => {
    return {
        height: "50px",
        backgroundColor: color,
        padding: "12px",
        color: "white"
    }
}

const FlexExampleItemOffset = () => {
    return (
        <React.Fragment>
            <Flex style={containerStyle}>
                <Flex.Item offset={3} size={9}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: quarter</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={4} size={8}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: third</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={6} size={6}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: half</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={8} size={4}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: 2 thirds</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={9} size={3}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: 3 quarters</div>
                </Flex.Item>
            </Flex>
        </React.Fragment>
    )
}

export default FlexExampleItemOffset
