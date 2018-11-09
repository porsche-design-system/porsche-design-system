import React from "react"
import { Text, Spacing, Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => {
    return {
        color: "white",
        height: "50px",
        width: "200px",
        marginBottom: "8px",
        textAlign: "center",
        backgroundColor: color
    }
}

const FlexContainerExampleDirection = () => {
    return (
        <React.Fragment>
            <Text>Row (standard):</Text>
            <Flex>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>3</div>
                </Flex.Item>
            </Flex>

            <Spacing marginTop={30}>
                <Text>Row reverse:</Text>
                <Flex direction="row-reverse">
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </Spacing>

            <Spacing marginTop={30}>
                <Text>Column:</Text>
                <Flex direction="column">
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </Spacing>

            <Spacing marginTop={30}>
                <Text>Column reverse:</Text>
                <Flex direction="column-reverse">
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>1</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>2</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div style={itemStyle("DeepSkyBlue")}>3</div>
                    </Flex.Item>
                </Flex>
            </Spacing>
        </React.Fragment>
    )
}

export default FlexContainerExampleDirection
