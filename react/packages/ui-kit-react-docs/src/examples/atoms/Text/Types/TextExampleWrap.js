import React from "react"
import { Text } from "@porsche/ui-kit-react"

const TextExampleWrap = () => {
    return (
        <div>
            <Text>wrap</Text>
            <Text wrap={false}>nowrap</Text>
        </div>
    )
}

export default TextExampleWrap
