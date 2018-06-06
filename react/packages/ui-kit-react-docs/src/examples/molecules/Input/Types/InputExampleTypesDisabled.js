import React from "react"
import { Input, Flex } from "@porsche/ui-kit-react"

const InputExampleTypesError = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={3}>
                <Input disabled placeholder="Floating Label" />
            </Flex.Item>

            <Flex.Item width={3}>
                <Input disabled placeholder="Floating Label" value="Value" />
            </Flex.Item>

            <Flex.Item width={3}>
                <Input disabled placeholder="Placeholder" basic />
            </Flex.Item>

            <Flex.Item width={3}>
                <Input disabled placeholder="Placeholder" basic value="Value" icon="cancel" />
            </Flex.Item>
        </Flex>
    )
}

export default InputExampleTypesError
