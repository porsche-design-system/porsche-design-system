import React from "react"
import { Text, Flex } from "@porsche/ui-kit-react"

const containerStyle = { backgroundColor: "WhiteSmoke", marginBottom: "18px" }

const itemStyle = (height, color) => {
    return {
        color: "white",
        height,
        width: "200px",
        textAlign: "center",
        backgroundColor: color
    }
}

const FlexAlignMainAxis = () => {
    return (
        <React.Fragment>
            <Text>Start (default):</Text>
            <div style={containerStyle}>
                <Flex alignMainAxis="start">
                    <Flex.Item>
                        <div style={itemStyle("20px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("50px", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("30px", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>

            <Text>Center:</Text>
            <div style={containerStyle}>
                <Flex alignMainAxis="center">
                    <Flex.Item>
                        <div style={itemStyle("20px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("50px", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("30px", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>

            <Text>End:</Text>
            <div style={containerStyle}>
                <Flex alignMainAxis="end">
                    <Flex.Item>
                        <div style={itemStyle("20px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("50px", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("30px", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>

            <Text>Space between:</Text>
            <div style={containerStyle}>
                <Flex alignMainAxis="space-between">
                    <Flex.Item>
                        <div style={itemStyle("20px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("50px", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("30px", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>

            <Text>Space around:</Text>
            <div style={containerStyle}>
                <Flex alignMainAxis="space-around">
                    <Flex.Item>
                        <div style={itemStyle("20px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("50px", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("30px", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>

            <Text>Space evenly:</Text>
            <div style={containerStyle}>
                <Flex alignMainAxis="space-evenly">
                    <Flex.Item>
                        <div style={itemStyle("20px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("50px", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("30px", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>

            <Text>Responsive behaviour (base: start, l: end):</Text>
            <div style={containerStyle}>
                <Flex alignMainAxis={{ base: "start", l: "end" }}>
                    <Flex.Item>
                        <div style={itemStyle("20px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("50px", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("30px", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>
        </React.Fragment>
    )
}

export default FlexAlignMainAxis
