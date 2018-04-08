import React from "react"
import { Checkbox, Flex, Spacing } from "@porsche/ui-kit-react"

const CheckboxExampleChecked = () => {
    return (
        <Flex wrap>
            <Checkbox>
                Checkbox
            </Checkbox>

            <Checkbox checked>
                Checkbox
            </Checkbox>

            <Checkbox checked type="red">
                Checkbox
            </Checkbox>

            <Checkbox checked type="blue">
                Checkbox
            </Checkbox>

            <Spacing padding={18} style={{ backgroundColor: "black" }}>
                <Checkbox type="inverted">
                    Checkbox
                </Checkbox>
            </Spacing>

            <Spacing padding={18} style={{ backgroundColor: "black" }}>
                <Checkbox checked type="inverted">
                    Checkbox
                </Checkbox>
            </Spacing>
        </Flex>
    )
}

export default CheckboxExampleChecked
