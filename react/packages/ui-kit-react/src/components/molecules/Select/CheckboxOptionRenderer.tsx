import * as React from "react"
import { Checkbox } from "../../../index"

export const CheckboxOptionRenderer = (option: any, index: number): any => {
    // Option Group, show only a label
    if (option.options) {
        return option.label
    }

    // Option, show Checkbox
    return (
        <Checkbox checked={option.selected} singleLine>
            {option.label}
        </Checkbox>
    )
}
