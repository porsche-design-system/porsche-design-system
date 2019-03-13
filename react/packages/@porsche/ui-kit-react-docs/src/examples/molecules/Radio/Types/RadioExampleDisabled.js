import React from "react"
import { Flex, Radio } from "@porsche/ui-kit-react"

const RadioExampleDisabled = () => {
    return (
        <Flex>
            <Radio value="radio_example_disabled_1" name="radioExampleDisabled" disabled>
                Radio
            </Radio>
            <Radio value="radio_example_disabled_2" name="radioExampleDisabled" checked disabled>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleDisabled
