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

const FlexExampleItemWidthSpecific = () => {
    return (
        <React.Fragment>
            <Flex style={containerStyle}>
                <Flex.Item size={3}>
                    <div style={itemStyle("LightSkyBlue")}>Width: quarter</div>
                </Flex.Item>
                <Flex.Item size={3}>
                    <div style={itemStyle("DeepSkyBlue")}>Width: quarter</div>
                </Flex.Item>
                <Flex.Item size={3}>
                    <div style={itemStyle("dodgerblue")}>Width: quarter</div>
                </Flex.Item>
                <Flex.Item size={3}>
                    <div style={itemStyle("DeepSkyBlue")}>Width: quarter</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item size={4}>
                    <div style={itemStyle("LightSkyBlue")}>Width: third</div>
                </Flex.Item>
                <Flex.Item size={4}>
                    <div style={itemStyle("DeepSkyBlue")}>Width: third</div>
                </Flex.Item>
                <Flex.Item size={4}>
                    <div style={itemStyle("dodgerblue")}>Width: third</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item size={6}>
                    <div style={itemStyle("LightSkyBlue")}>Width: half</div>
                </Flex.Item>
                <Flex.Item size={6}>
                    <div style={itemStyle("DeepSkyBlue")}>Width: half</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item size={8}>
                    <div style={itemStyle("LightSkyBlue")}>Width: 2 thirds</div>
                </Flex.Item>
                <Flex.Item size={4}>
                    <div style={itemStyle("DeepSkyBlue")}>Width: third</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item size={9}>
                    <div style={itemStyle("LightSkyBlue")}>Width: 3 quarters</div>
                </Flex.Item>
                <Flex.Item size={3}>
                    <div style={itemStyle("DeepSkyBlue")}>Width: quarter</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item size={12}>
                    <div style={itemStyle("DeepSkyBlue")}>Width: full</div>
                </Flex.Item>
            </Flex>
        </React.Fragment>
    )
}

export default FlexExampleItemWidthSpecific
