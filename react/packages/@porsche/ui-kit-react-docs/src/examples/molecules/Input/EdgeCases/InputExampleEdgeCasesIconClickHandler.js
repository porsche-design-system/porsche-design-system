import React from "react"
import { Input } from "@porsche/ui-kit-react"

const InputExampleEdgeCasesIconClickHandler = () => {
    const handleOnIconClicked = (event) => {
        alert("Icon clicked...")
    }
    return <Input icon="calendar" onIconClicked={handleOnIconClicked} />
}

export default InputExampleEdgeCasesIconClickHandler
