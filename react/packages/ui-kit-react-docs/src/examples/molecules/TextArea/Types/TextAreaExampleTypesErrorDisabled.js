import React from "react"
import { TextArea, Flex } from "@porsche/ui-kit-react"

const TextAreaExampleTypesErrorDisabled = () => {
    return (
        <div>
            <Flex gap="grid">
                <Flex.Item width={3}>
                    <TextArea error disabled placeholder="Floating Label" />
                </Flex.Item>

                <Flex.Item width={3}>
                    <TextArea error disabled placeholder="Floating Label" value="Value" onChange={() => {}} />
                </Flex.Item>

                <Flex.Item width={3}>
                    <TextArea error disabled placeholder="Placeholder" basic />
                </Flex.Item>

                <Flex.Item width={3}>
                    <TextArea error disabled placeholder="Placeholder" basic value="Value" onChange={() => {}} />
                </Flex.Item>
            </Flex>
        </div>
    )
}

export default TextAreaExampleTypesErrorDisabled
