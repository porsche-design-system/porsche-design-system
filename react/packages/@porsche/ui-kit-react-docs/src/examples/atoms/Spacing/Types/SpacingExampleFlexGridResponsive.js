import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const boxStyles = { backgroundColor: "#246A97", height: "100px" }

const SpacingExampleStatic = () => {
    return (
        <Flex gap="a">
            <Flex.Item width={3}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={3}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={3}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={3}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>
        </Flex>
    )
}

export default SpacingExampleStatic
