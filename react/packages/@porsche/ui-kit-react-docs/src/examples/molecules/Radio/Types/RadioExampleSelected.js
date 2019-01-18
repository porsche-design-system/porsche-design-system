import React from "react"
import { Spacing, Flex, Radio, Divider } from "@porsche/ui-kit-react"

const RadioExampleSelected = () => {
    return (
        <Flex>
            <Radio name="radioExampleSelected" singleLine={true}>
                Radio
            </Radio>
            <Radio name="radioExampleSelected" checked={true}>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleSelected
