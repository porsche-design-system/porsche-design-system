import React from "react"
import { Input, Flex } from "@porsche/ui-kit-react"

const InputExampleTypesNoPlaceholder = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={4}>
                <Input />
            </Flex.Item>

            <Flex.Item width={4}>
                <Input basic icon="magnify_glass" />
            </Flex.Item>

            <Flex.Item width={4}>
                <Input basic unit="km" />
            </Flex.Item>
        </Flex>
    )
}

export default InputExampleTypesNoPlaceholder
