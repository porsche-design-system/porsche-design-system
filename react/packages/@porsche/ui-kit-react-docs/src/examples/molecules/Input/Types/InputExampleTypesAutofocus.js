import React from "react"
import { Input, Flex } from "@porsche/ui-kit-react"

const InputExampleTypesAutofocus = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={3}>
                <Input autofocus placeholder="Floating Label" />
            </Flex.Item>
        </Flex>
    )
}

export default InputExampleTypesAutofocus
