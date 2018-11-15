import React from "react"
import { Spacing, Text, Flex } from "@porsche/ui-kit-react"

const containerStyle = { marginBottom: "8px" }

const itemStyle = (color) => {
    return {
        height: "50px",
        backgroundColor: color,
        padding: "12px",
        color: "white"
    }
}

const FlexExampleItemWidth = () => {
    return (
        <React.Fragment>
            <Text>Automatic width (default):</Text>
            <Flex>
                <Flex.Item>
                    <div style={itemStyle("LightSkyBlue")}>An element</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>An element with a little more text</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("dodgerblue")}>An element</div>
                </Flex.Item>
                <Flex.Item>
                    <div style={itemStyle("DeepSkyBlue")}>An element with more content</div>
                </Flex.Item>
            </Flex>

            <Spacing marginTop={30}>
                <Text>Equal width:</Text>
                <Flex>
                    <Flex.Item flex="equal">
                        <div style={itemStyle("LightSkyBlue")}>An element</div>
                    </Flex.Item>
                    <Flex.Item flex="equal">
                        <div style={itemStyle("DeepSkyBlue")}>An element with a little more text</div>
                    </Flex.Item>
                    <Flex.Item flex="equal">
                        <div style={itemStyle("dodgerblue")}>An element</div>
                    </Flex.Item>
                    <Flex.Item flex="equal">
                        <div style={itemStyle("DeepSkyBlue")}>An element with more content</div>
                    </Flex.Item>
                </Flex>
            </Spacing>

            <Spacing marginTop={30}>
                <Text>Specific widths:</Text>
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
            </Spacing>

            <Spacing marginTop={30}>
                <Text>Responsive behaviour (base: 6, l: 3):</Text>
                <Flex wrap>
                    <Flex.Item size={{ base: 6, l: 3 }}>
                        <div style={itemStyle("LightSkyBlue")}>An element</div>
                    </Flex.Item>
                    <Flex.Item size={{ base: 6, l: 3 }}>
                        <div style={itemStyle("DeepSkyBlue")}>An element with a little more text</div>
                    </Flex.Item>
                    <Flex.Item size={{ base: 6, l: 3 }}>
                        <div style={itemStyle("dodgerblue")}>An element</div>
                    </Flex.Item>
                    <Flex.Item size={{ base: 6, l: 3 }}>
                        <div style={itemStyle("DeepSkyBlue")}>An element with more content</div>
                    </Flex.Item>
                </Flex>
            </Spacing>
        </React.Fragment>
    )
}

export default FlexExampleItemWidth
