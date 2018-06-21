import React from "react"
import { Flex } from "@porsche/ui-kit-react"

const style = { height: "20px", width: "100%", backgroundColor: "DeepSkyBlue", marginBottom: "8px" }
const FlexContainerExampleDirection = () => {
    return (
        <div>
            <Flex direction="column">
                <div style={style}>1</div>
                <div style={style}>2</div>
                <div style={style}>3</div>
            </Flex>
            <br />
            <Flex direction="column-reverse">
                <div style={style}>1</div>
                <div style={style}>2</div>
                <div style={style}>3</div>
            </Flex>
        </div>
    )
}

export default FlexContainerExampleDirection
