import React from "react"
import { Text } from "@porsche/ui-kit-react"

const type = "3-regular"

const TextExampleAlign = () => {
    return (
        <div>
            <Text align="left" type={type}>
                left
            </Text>
            <Text align="center" type={type}>
                center
            </Text>
            <Text align="right" type={type}>
                right
            </Text>
        </div>
    )
}

export default TextExampleAlign
