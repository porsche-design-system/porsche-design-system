import React from "react"
import { Flex, Radio } from "@porsche/ui-kit-react"

const RadioExampleError = () => {
    return (
        <Flex>
            <Radio value="radio_example_error_1" name="radioExampleError" error>
                Radio
            </Radio>
            <Radio value="radio_example_error_2" name="radioExampleError" checked error>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleError
