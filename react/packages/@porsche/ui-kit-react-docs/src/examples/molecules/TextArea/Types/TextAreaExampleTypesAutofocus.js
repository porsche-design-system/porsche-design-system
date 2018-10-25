import React from "react"
import { TextArea, Flex } from "@porsche/ui-kit-react"

const TextAreaExampleTypesAutofocus = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={3}>
                <TextArea autofocus placeholder="Floating Label" />
            </Flex.Item>
        </Flex>
    )
}

export default TextAreaExampleTypesAutofocus
