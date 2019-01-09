import React from "react"
import { Input, Icon } from "@porsche/ui-kit-react"

const InputExampleWithCustomIcon = () => {
    const handleOnIconClicked = (event) => {
        alert("You have clicked on the custom icon")
    }
    return <Input icon={<Icon name="calendar" onClick={handleOnIconClicked} />} />
}

export default InputExampleWithCustomIcon
