import React from "react"
import { Flex, Scroll, Text, Spacing } from "@porsche/ui-kit-react"

import lorem from "lorem-ipsum"

const boxStyles = { backgroundColor: "#246A97" }

const ScrollExampleExplicitHeight = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={6}>
                <Scroll style={{ height: "300px", ...boxStyles }}>
                    <Text color="white">{lorem({ count: 30 })}</Text>
                </Scroll>
            </Flex.Item>

            <Flex.Item width={6}>
                <Spacing padding={30}>
                    <Scroll style={{ height: "300px", ...boxStyles }}>
                        <Text color="white">{lorem({ count: 30 })}</Text>
                    </Scroll>
                </Spacing>
            </Flex.Item>
        </Flex>
    )
}

export default ScrollExampleExplicitHeight
