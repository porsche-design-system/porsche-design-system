import React from "react"
import { Flex, Scroll, Text, Spacing } from "@porsche/ui-kit-react"

import lorem from "lorem-ipsum"

const boxStyles = { backgroundColor: "#246A97" }

const ScrollExampleImplicitHeight = () => {
    return (
        <Flex direction="row" alignCrossAxis="stretch" style={{ height: "300px" }}>
            <Spacing padding={30}>
                <Scroll style={{ ...boxStyles }}>
                    <Text color="white">{lorem({ count: 50 })}</Text>
                </Scroll>
            </Spacing>
        </Flex>
    )
}

export default ScrollExampleImplicitHeight
