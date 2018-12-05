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
                    <Flex.Item width="one-quarter">
                        <div style={itemStyle("LightSkyBlue")}>one-quarter</div>
                    </Flex.Item>
                    <Flex.Item width="one-quarter">
                        <div style={itemStyle("DeepSkyBlue")}>one-quarter</div>
                    </Flex.Item>
                    <Flex.Item width="one-quarter">
                        <div style={itemStyle("dodgerblue")}>one-quarter</div>
                    </Flex.Item>
                    <Flex.Item width="one-quarter">
                        <div style={itemStyle("DeepSkyBlue")}>one-quarter</div>
                    </Flex.Item>
                </Flex>
                <Flex style={containerStyle}>
                    <Flex.Item width="one-third">
                        <div style={itemStyle("LightSkyBlue")}>one-third</div>
                    </Flex.Item>
                    <Flex.Item width="one-third">
                        <div style={itemStyle("DeepSkyBlue")}>one-third</div>
                    </Flex.Item>
                    <Flex.Item width="one-third">
                        <div style={itemStyle("dodgerblue")}>one-third</div>
                    </Flex.Item>
                </Flex>
                <Flex style={containerStyle}>
                    <Flex.Item width="half">
                        <div style={itemStyle("LightSkyBlue")}>half</div>
                    </Flex.Item>
                    <Flex.Item width="half">
                        <div style={itemStyle("DeepSkyBlue")}>half</div>
                    </Flex.Item>
                </Flex>
                <Flex style={containerStyle}>
                    <Flex.Item width="two-thirds">
                        <div style={itemStyle("LightSkyBlue")}>two-thirds</div>
                    </Flex.Item>
                    <Flex.Item width="one-third">
                        <div style={itemStyle("DeepSkyBlue")}>one-third</div>
                    </Flex.Item>
                </Flex>
                <Flex style={containerStyle}>
                    <Flex.Item width="three-quarters">
                        <div style={itemStyle("LightSkyBlue")}>three-quarters</div>
                    </Flex.Item>
                    <Flex.Item width="one-quarter">
                        <div style={itemStyle("DeepSkyBlue")}>one-quarter</div>
                    </Flex.Item>
                </Flex>
                <Flex style={containerStyle}>
                    <Flex.Item width="full">
                        <div style={itemStyle("DeepSkyBlue")}>full</div>
                    </Flex.Item>
                </Flex>
            </Spacing>

            <Spacing marginTop={30}>
                <Text>{'Responsive behaviour (base: "half", l: "one-quarter"):'}</Text>
                <Flex wrap>
                    <Flex.Item width={{ base: "half", l: "one-quarter" }}>
                        <div style={itemStyle("LightSkyBlue")}>An element</div>
                    </Flex.Item>
                    <Flex.Item width={{ base: "half", l: "one-quarter" }}>
                        <div style={itemStyle("DeepSkyBlue")}>An element with a little more text</div>
                    </Flex.Item>
                    <Flex.Item width={{ base: "half", l: "one-quarter" }}>
                        <div style={itemStyle("dodgerblue")}>An element</div>
                    </Flex.Item>
                    <Flex.Item width={{ base: "half", l: "one-quarter" }}>
                        <div style={itemStyle("DeepSkyBlue")}>An element with more content</div>
                    </Flex.Item>
                </Flex>
            </Spacing>
        </React.Fragment>
    )
}

export default FlexExampleItemWidth
