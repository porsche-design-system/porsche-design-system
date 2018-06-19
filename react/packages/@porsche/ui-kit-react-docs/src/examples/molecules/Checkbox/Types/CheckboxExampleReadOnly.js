import React from "react"
import { Checkbox, Flex } from "@porsche/ui-kit-react"

const onChange = (e) => {
    alert("Checkbox changed!")
}

const CheckboxExampleReadOnly = () => {
    return (
        <Flex>
            <Checkbox readOnly onChange={onChange}>
                Checkbox
            </Checkbox>

            <Checkbox readOnly checked onChange={onChange}>
                Checkbox
            </Checkbox>
        </Flex>
    )
}

export default CheckboxExampleReadOnly
