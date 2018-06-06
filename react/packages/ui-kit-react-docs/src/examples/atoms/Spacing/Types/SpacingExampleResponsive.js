import React from "react"
import { Flex, Spacing } from "@porsche/ui-kit-react"

const boxStyles = { backgroundColor: "#246A97" }

const SpacingExampleResponsive = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={1}>
                <Spacing paddingBottom={"a"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={"b"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={"c"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={"d"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={"e"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={"f"}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>
        </Flex>
    )
}

export default SpacingExampleResponsive
