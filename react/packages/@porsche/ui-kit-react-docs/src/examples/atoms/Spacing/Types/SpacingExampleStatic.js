import React from "react"
import { Flex, Spacing } from "@porsche/ui-kit-react"

const boxStyles = { backgroundColor: "#246A97" }

const SpacingExampleStatic = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={1}>
                <Spacing paddingBottom={3}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={6}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={12}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={18}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={24}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={30}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={36}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={42}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={48}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={54}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>

            <Flex.Item width={1}>
                <Spacing paddingBottom={60}>
                    <div style={{ ...boxStyles }} />
                </Spacing>
            </Flex.Item>
        </Flex>
    )
}

export default SpacingExampleStatic
