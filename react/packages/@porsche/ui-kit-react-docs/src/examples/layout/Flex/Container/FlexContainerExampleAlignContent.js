import React from "react"
import { Text, Flex } from "@porsche/ui-kit-react"
import _ from "lodash"

const containerStyle = { backgroundColor: "WhiteSmoke", marginBottom: "18px", height: "200px" }

const itemStyle = (color) => {
    return {
        color: "white",
        height: "50px",
        width: "200px",
        textAlign: "center",
        backgroundColor: color
    }
}

const FlexAlignContent = () => {
    return (
        <React.Fragment>
            <Text>Start (default):</Text>
            <Flex alignContent="start" style={containerStyle}>
                {_.times(9, (i) => {
                    return (
                        <Flex.Item key={i}>
                            <div style={itemStyle("DeepSkyBlue")}>{i + 1}</div>
                        </Flex.Item>
                    )
                })}
            </Flex>

            <Text>Center:</Text>
            <Flex alignContent="center" style={containerStyle}>
                {_.times(9, (i) => {
                    return (
                        <Flex.Item key={i}>
                            <div style={itemStyle("DeepSkyBlue")}>{i + 1}</div>
                        </Flex.Item>
                    )
                })}
            </Flex>

            <Text>End:</Text>
            <Flex alignContent="end" style={containerStyle}>
                {_.times(9, (i) => {
                    return (
                        <Flex.Item key={i}>
                            <div style={itemStyle("DeepSkyBlue")}>{i + 1}</div>
                        </Flex.Item>
                    )
                })}
            </Flex>

            <Text>Space around:</Text>
            <Flex alignContent="space-around" style={containerStyle}>
                {_.times(9, (i) => {
                    return (
                        <Flex.Item key={i}>
                            <div style={itemStyle("DeepSkyBlue")}>{i + 1}</div>
                        </Flex.Item>
                    )
                })}
            </Flex>

            <Text>Space between:</Text>
            <Flex alignContent="space-between" style={containerStyle}>
                {_.times(9, (i) => {
                    return (
                        <Flex.Item key={i}>
                            <div style={itemStyle("DeepSkyBlue")}>{i + 1}</div>
                        </Flex.Item>
                    )
                })}
            </Flex>

            <Text>Responsive behaviour (base: start, l: end):</Text>
            <Flex alignContent={{ base: "start", l: "end" }} style={containerStyle}>
                {_.times(9, (i) => {
                    return (
                        <Flex.Item key={i}>
                            <div style={itemStyle("DeepSkyBlue")}>{i + 1}</div>
                        </Flex.Item>
                    )
                })}
            </Flex>
        </React.Fragment>
    )
}

export default FlexAlignContent
