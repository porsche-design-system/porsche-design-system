import React from "react"
import { Text, Spacing, Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => {
    return {
        color: "white",
        height: "50px",
        width: "200px",
        textAlign: "center",
        backgroundColor: color
    }
}

const FlexContainerExampleBasic = () => {
    return (
        <React.Fragment>
            <Text>Standard behaviour:</Text>
            <Flex>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("LightSkyBlue")}>2</div>
                </Flex.Item>
            </Flex>

            <Spacing marginTop={30}>
                <Text>Flex container inline:</Text>
                <Flex inline>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>2</div>
                    </Flex.Item>
                </Flex>
                <Flex inline>
                    <Flex.Item>
                        <div style={itemStyle("LightSkyBlue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("LightSkyBlue")}>2</div>
                    </Flex.Item>
                </Flex>
            </Spacing>

            <Spacing marginTop={30}>
                <Text>Flex container (responsive):</Text>
                <Flex inline={{ base: false, m: true }}>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>2</div>
                    </Flex.Item>
                </Flex>
                <Flex inline={{ base: false, m: true }}>
                    <Flex.Item>
                        <div style={itemStyle("LightSkyBlue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("LightSkyBlue")}>2</div>
                    </Flex.Item>
                </Flex>
            </Spacing>
        </React.Fragment>
    )
}

export default FlexContainerExampleBasic
