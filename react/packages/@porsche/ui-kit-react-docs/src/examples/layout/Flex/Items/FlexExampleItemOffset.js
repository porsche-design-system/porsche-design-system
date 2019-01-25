import React from "react"
import * as _ from "lodash"

import { Text, Flex } from "@porsche/ui-kit-react"

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
                <Flex.Item offset={"one-quarter"} width={"three-quarters"}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: quarter</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={"one-third"} width={"two-thirds"}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: third</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={"half"} width={"half"}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: half</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={"two-thirds"} width={"one-third"}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: 2 thirds</div>
                </Flex.Item>
            </Flex>
            <Flex style={containerStyle}>
                <Flex.Item offset={"three-quarters"} width={"one-quarter"}>
                    <div style={itemStyle("LightSkyBlue")}>Offset: 3 quarters</div>
                </Flex.Item>
            </Flex>

            <Text>Responsive behaviour (base: "none", l: "one-third"):</Text>
            <Flex style={containerStyle}>
                <Flex.Item offset={{ base: "none", l: "one-third" }}>
                    <div style={itemStyle("DeepSkyBlue")}>An element with responsive offset</div>
                </Flex.Item>
            </Flex>
        </React.Fragment>
    )
}

export default FlexExampleItemOffset
