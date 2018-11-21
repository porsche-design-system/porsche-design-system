import React from "react"
import { Text, Flex } from "@porsche/ui-kit-react"

const itemStyle = (color) => {
    return {
        color: "white",
        height: "50px",
        width: "200px",
        textAlign: "center",
        backgroundColor: color,
        marginBottom: "8px"
    }
}

const FlexContainerExampleGap = () => {
    return (
        <React.Fragment>
            <Text>Gap (of 24px) between items:</Text>
            <Flex gap={12}>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>1</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>2</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>3</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>4</div>
                </Flex.Item>
            </Flex>
        </React.Fragment>
    )
}

export default FlexContainerExampleGap
