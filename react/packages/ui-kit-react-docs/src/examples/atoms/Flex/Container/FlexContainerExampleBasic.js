import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const style = { height: "50px", width: "200px", backgroundColor: "DeepSkyBlue" }

const FlexContainerExampleBasic = () => {
    return (
        <Flex alignMainAxis="center">
            <div style={style} />
        </Flex>
    )
}

export default FlexContainerExampleBasic
