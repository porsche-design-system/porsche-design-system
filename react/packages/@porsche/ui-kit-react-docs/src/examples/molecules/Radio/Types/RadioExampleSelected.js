import React from "react"
import { Spacing, Flex, Radio, Divider } from "@porsche/ui-kit-react"

const RadioExampleSelected = () => {
    return (
        <Flex>
            <Radio id="radio_example_selected_1" name="radioExampleSelected" singleLine={true}>
                Radio
            </Radio>
            <Radio id="radio_example_selected_2" name="radioExampleSelected" checked={true}>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleSelected
