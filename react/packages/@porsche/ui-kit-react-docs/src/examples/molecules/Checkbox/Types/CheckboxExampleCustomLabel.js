import React from "react"
import { Checkbox, Flex } from "@porsche/ui-kit-react"

const onChange = (e) => {
    alert("Checkbox changed!")
}

const itemStyle = (color) => {
    return { height: "20px", backgroundColor: color }
}

const CheckboxExampleCustomLabel = () => {
    return (
        <Flex>
            <label>
                <span style={itemStyle("grey")}>
                    custom content inside custom label <br /> which can be clicked to toggle checkbox
                </span>
                <Checkbox onChange={onChange} labelAs="span">
                    Checkbox
                </Checkbox>
            </label>
        </Flex>
    )
}

export default CheckboxExampleCustomLabel
