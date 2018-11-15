import React from "react"
import _ from "lodash"

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

const FlexContainerExampleWrap = () => {
    return (
        <React.Fragment>
            <Text>Wrap (default):</Text>
            <Flex>
                {_.times(9, (i) => {
                    return (
                        <Flex.Item>
                            <div key={i} style={itemStyle("DeepSkyBlue")}>
                                {i + 1}
                            </div>
                        </Flex.Item>
                    )
                })}
            </Flex>

            <Spacing marginTop={30}>
                <Text>Wrap no:</Text>
                <Flex wrap={false}>
                    {_.times(9, (i) => {
                        return (
                            <Flex.Item>
                                <div key={i} style={itemStyle("DeepSkyBlue")}>
                                    {i + 1}
                                </div>
                            </Flex.Item>
                        )
                    })}
                </Flex>
            </Spacing>

            <Spacing marginTop={30}>
                <Text>Wrap reverse:</Text>
                <Flex wrap="reverse">
                    {_.times(9, (i) => {
                        return (
                            <Flex.Item>
                                <div key={i} style={itemStyle("DeepSkyBlue")}>
                                    {i + 1}
                                </div>
                            </Flex.Item>
                        )
                    })}
                </Flex>
            </Spacing>

            <Spacing marginTop={30}>
                <Text>Responsive behaviour (base: true, l: false):</Text>
                <Flex wrap={{ base: true, l: false }}>
                    {_.times(9, (i) => {
                        return (
                            <Flex.Item>
                                <div key={i} style={itemStyle("DeepSkyBlue")}>
                                    {i + 1}
                                </div>
                            </Flex.Item>
                        )
                    })}
                </Flex>
            </Spacing>
        </React.Fragment>
    )
}

export default FlexContainerExampleWrap
