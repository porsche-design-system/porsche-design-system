import React from "react"
import { TextArea, Flex } from "@porsche/ui-kit-react"

const TextAreaExampleTypesError = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={3}>
                <TextArea error placeholder="Floating Label" />
            </Flex.Item>

            <Flex.Item width={3}>
                <TextArea error placeholder="Floating Label" value="Value" onChange={() => {}} />
            </Flex.Item>

            <Flex.Item width={3}>
                <TextArea error placeholder="Placeholder" basic />
            </Flex.Item>

            <Flex.Item width={3}>
                <TextArea error placeholder="Placeholder" basic value="Value" onChange={() => {}} />
            </Flex.Item>
        </Flex>
    )
}

export default TextAreaExampleTypesError
