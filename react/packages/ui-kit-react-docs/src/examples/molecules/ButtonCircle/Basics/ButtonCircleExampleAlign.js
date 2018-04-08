import React from "react"
import { ButtonCircle, Flex } from "@porsche/ui-kit-react"

const ButtonCircleExampleAlign = () => {
    return (
        <Flex>
            <Flex.Item width={3}>
                <ButtonCircle icon="loader" align="left">
                    Align Left
                </ButtonCircle>
            </Flex.Item>

            <Flex.Item width={3}>
                <ButtonCircle icon="loader" align="right">
                    Align Right
                </ButtonCircle>
            </Flex.Item>
        </Flex>

    )
}

export default ButtonCircleExampleAlign
