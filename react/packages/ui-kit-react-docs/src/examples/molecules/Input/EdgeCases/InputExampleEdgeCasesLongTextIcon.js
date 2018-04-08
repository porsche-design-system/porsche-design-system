import React from "react"
import { Input, Flex } from "@porsche/ui-kit-react"

const InputExampleEdgeCasesLongTextIcon = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={3}>
                <Input
                    icon="magnify_glass"
                    placeholder="Floating Label Floating Label Floating Label Floating Label"
                />
            </Flex.Item>

            <Flex.Item width={3}>
                <Input
                    icon="magnify_glass"
                    placeholder="Floating Label Floating Label Floating Label Floating Label"
                    value="Value Value Value Value Value Value Value Value Value"
                    onChange={() => {}}
                />
            </Flex.Item>

            <Flex.Item width={3}>
                <Input
                    icon="magnify_glass"
                    basic
                    placeholder="Placeholder Placeholder Placeholder Placeholder Placeholder"
                />
            </Flex.Item>

            <Flex.Item width={3}>
                <Input
                    icon="magnify_glass"
                    basic
                    placeholder="Placeholder Placeholder Placeholder Placeholder Placeholder"
                    value="Value Value Value Value Value Value Value Value Value"
                    onChange={() => {}}
                />
            </Flex.Item>
        </Flex>
    )
}

export default InputExampleEdgeCasesLongTextIcon
