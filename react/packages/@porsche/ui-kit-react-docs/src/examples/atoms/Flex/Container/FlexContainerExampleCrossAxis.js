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

const FlexAlignCrossAxis = () => {
    return (
        <React.Fragment>
            <Text>Start (default):</Text>
            <div style={containerStyle}>
                <Flex alignCrossAxis="start">
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
                <Flex alignCrossAxis="center">
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
                <Flex alignCrossAxis="end">
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

            <Text>Stretch:</Text>
            <div style={containerStyle}>
                <Flex alignCrossAxis="stretch">
                    <Flex.Item>
                        <div style={itemStyle("50px", "dodgerblue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("100%", "DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("100%", "LightSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </div>

            <Text>Baseline:</Text>
            <div style={containerStyle}>
                <Flex alignCrossAxis="baseline">
                    <Flex.Item>
                        <div
                            style={{
                                height: "20px",
                                width: "200px",
                                color: "white",
                                backgroundColor: "dodgerblue",
                                marginTop: "20px"
                            }}
                        >
                            1
                        </div>
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
                <Flex alignCrossAxis={{ base: "start", l: "end" }}>
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

export default FlexAlignCrossAxis
