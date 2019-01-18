import React from "react"
import { Flex, Spacing, Radio } from "@porsche/ui-kit-react"

const RadioExampleDisabled = () => {
    return (
        <Flex>
            <Radio name="radioExampleDisabled" disabled={true}>
                Radio
            </Radio>
            <Radio name="radioExampleDisabled" checked={true} disabled={true}>
                Radio
            </Radio>
        </Flex>
    )
}

export default RadioExampleDisabled
