import React from "react"
import { Text, Flex } from "@porsche/ui-kit-react"

const type = "3-regular"

const colors = (
    <div style={{ marginTop: "16px", marginBottom: "16px" }}>
        <Text color="black" type={type} align="center">black</Text>
        <Text color="grey-darker" type={type} align="center">grey-darker</Text>
        <Text color="grey-dark" type={type} align="center">grey-dark</Text>
        <Text color="grey" type={type} align="center">grey</Text>
        <Text color="grey-light" type={type} align="center">grey-light</Text>
        <Text color="grey-lighter" type={type} align="center">grey-lighter</Text>
        <Text color="white" type={type} align="center">white</Text>
        <Text color="red-1" type={type} align="center">red-1</Text>
        <Text color="red-2" type={type} align="center">red-2</Text>
        <Text color="blue-1" type={type} align="center">blue-1</Text>
        <Text color="blue-2" type={type} align="center">blue-2</Text>
    </div>
)

const TextExampleColors = () => {
    return (
        <Flex>
            <Flex.Item width={6}>
                { colors }
            </Flex.Item>
            <Flex.Item width={6} style={{ backgroundColor: "black" }}>
                { colors }
            </Flex.Item>
        </Flex>
    )
}

export default TextExampleColors
