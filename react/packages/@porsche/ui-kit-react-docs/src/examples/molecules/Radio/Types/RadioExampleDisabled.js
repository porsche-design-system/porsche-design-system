import React from "react"
import { Flex, Spacing, Radio } from "@porsche/ui-kit-react"

const RadioExampleDisabled = () => {
    return (
        <Flex>
            <Radio id="radio_example_disabled_1" name="radioExampleDisabled" disabled={true}>
                Radio
            </Radio>
            <Radio id="radio_example_disabled_2" name="radioExampleDisabled" checked={true} disabled={true}>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleDisabled
