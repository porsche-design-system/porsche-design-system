import React from "react"
import { Flex, Spacing } from "@porsche/ui-kit-react"

const boxStyles = { backgroundColor: "#246A97", height: "100px" }

const SpacingExampleStatic = () => {
    return (
        <Flex gap={6}>
            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>

            <Flex.Item width={1}>
                <div style={{ ...boxStyles }} />
            </Flex.Item>
        </Flex>
    )
}

export default SpacingExampleStatic
