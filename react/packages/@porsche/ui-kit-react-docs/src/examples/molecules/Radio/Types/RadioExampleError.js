import React from "react"
import { Flex, Spacing, Radio } from "@porsche/ui-kit-react"

const RadioExampleError = () => {
    return (
        <Flex>
            <Radio id="radio_example_error_1" name="radioExampleError" error={true}>
                Radio
            </Radio>
            <Radio id="radio_example_error_2" name="radioExampleError" checked={true} error={true}>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleError
