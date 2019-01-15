import React from "react"
import { Flex, Spacing, Radio } from "@porsche/ui-kit-react"

const RadioExampleError = () => {
    return (
        <Flex>
            <Radio name="radioExampleError" error={true}>
                Radio
            </Radio>
            <Radio name="radioExampleError" checked={true} error={true}>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleError
