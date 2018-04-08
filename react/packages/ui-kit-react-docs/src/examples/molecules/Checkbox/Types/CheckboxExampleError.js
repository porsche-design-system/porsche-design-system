import React from "react"
import { Checkbox, Flex, Spacing } from "@porsche/ui-kit-react"

const CheckboxExampleError = () => {
    return (
        <Flex wrap>
            <Checkbox error>
                Checkbox
            </Checkbox>

            <Checkbox error checked>
                Checkbox
            </Checkbox>

            <Checkbox error checked type="red">
                Checkbox
            </Checkbox>

            <Checkbox error checked type="blue">
                Checkbox
            </Checkbox>

            <Spacing padding={18} style={{ backgroundColor: "black" }}>
                <Checkbox error type="inverted">
                    Checkbox
                </Checkbox>
            </Spacing>

            <Spacing padding={18} style={{ backgroundColor: "black" }}>
                <Checkbox error checked type="inverted">
                    Checkbox
                </Checkbox>
            </Spacing>

        </Flex>
    )
}

export default CheckboxExampleError
