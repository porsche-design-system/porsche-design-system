import React from "react"
import { Text, Flex } from "@porsche/ui-kit-react"

const containerStyle = { backgroundColor: "WhiteSmoke", marginBottom: "18px", height: "140px" }

const itemStyle = (height, color) => {
    return {
        height,
        width: "200px",
        backgroundColor: color,
        padding: "12px",
        color: "white"
    }
}

const FlexExampleAlignCrossAxis = () => {
    return (
        <React.Fragment>
            <Text>Auto (default):</Text>
            <Flex style={containerStyle}>
                <Flex.Item>
                    <div style={itemStyle("50px", "dodgerblue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("80px", "DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item alignCrossAxis="auto">
                    <div style={itemStyle("50px", "DeepPink")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("70px", "LightSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>

            <Text>Stretch:</Text>
            <Flex style={containerStyle}>
                <Flex.Item>
                    <div style={itemStyle("50px", "dodgerblue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("80px", "DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item alignCrossAxis="stretch">
                    <div style={itemStyle("100%", "DeepPink")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("70px", "LightSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>

            <Text>Start:</Text>
            <Flex style={containerStyle}>
                <Flex.Item>
                    <div style={itemStyle("50px", "dodgerblue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("80px", "DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item alignCrossAxis="start">
                    <div style={itemStyle("50px", "DeepPink")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("70px", "LightSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>

            <Text>End:</Text>
            <Flex style={containerStyle}>
                <Flex.Item>
                    <div style={itemStyle("50px", "dodgerblue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("80px", "DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item alignCrossAxis="end">
                    <div style={itemStyle("50px", "DeepPink")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("70px", "LightSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>

            <Text>Center:</Text>
            <Flex style={containerStyle}>
                <Flex.Item>
                    <div style={itemStyle("50px", "dodgerblue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("80px", "DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item alignCrossAxis="center">
                    <div style={itemStyle("50px", "DeepPink")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("70px", "LightSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>

            <Text>Baseline:</Text>
            <Flex style={containerStyle}>
                <Flex.Item alignCrossAxis="baseline">
                    <div
                        style={{
                            height: "50px",
                            padding: "12px",
                            width: "200px",
                            color: "white",
                            backgroundColor: "DeepSkyBlue",
                            marginTop: "20px"
                        }}
                    >
                        1
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("80px", "DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item alignCrossAxis="baseline">
                    <div style={itemStyle("50px", "DeepPink")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("70px", "LightSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>

            <Text>Responsive behaviour (base: start, l: end):</Text>
            <Flex style={containerStyle}>
                <Flex.Item>
                    <div style={itemStyle("50px", "dodgerblue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("80px", "DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item alignCrossAxis={{ base: "start", l: "end" }}>
                    <div style={itemStyle("50px", "DeepPink")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("70px", "LightSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>
        </React.Fragment>
    )
}

export default FlexExampleAlignCrossAxis
