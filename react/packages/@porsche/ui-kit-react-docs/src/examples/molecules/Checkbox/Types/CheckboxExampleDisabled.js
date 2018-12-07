import React from "react"
import { Checkbox, Flex, Spacing } from "@porsche/ui-kit-react"

const CheckboxExampleDisabled = () => {
    return (
        <Flex>
            <Checkbox disabled>Checkbox</Checkbox>

            <Checkbox disabled checked>
                Checkbox
            </Checkbox>

            <Checkbox disabled checked type="red">
                Checkbox
            </Checkbox>

            <Checkbox disabled checked type="blue">
                Checkbox
            </Checkbox>

            <Spacing padding={18} style={{ backgroundColor: "black" }}>
                <Checkbox disabled type="inverted">
                    Checkbox
                </Checkbox>
            </Spacing>

            <Spacing padding={18} style={{ backgroundColor: "black" }}>
                <Checkbox disabled checked type="inverted">
                    Checkbox
                </Checkbox>
            </Spacing>
        </Flex>
    )
}

export default CheckboxExampleDisabled
