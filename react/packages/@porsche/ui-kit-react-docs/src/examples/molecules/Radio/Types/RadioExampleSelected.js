import React from "react"
import { Flex, Radio } from "@porsche/ui-kit-react"

const RadioExampleSelected = () => {
    return (
        <Flex>
            <Radio value="radio_example_selected_1" name="radioExampleSelected" singleLine>
                Radio
            </Radio>
            <Radio value="radio_example_selected_2" name="radioExampleSelected" checked>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleSelected
