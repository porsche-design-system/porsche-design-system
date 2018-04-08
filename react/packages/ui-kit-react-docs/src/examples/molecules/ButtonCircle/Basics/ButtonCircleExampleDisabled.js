import React from "react"
import { ButtonCircle, Flex } from "@porsche/ui-kit-react"

const ButtonCircleExampleDisabled = () => {
    return (
        <Flex>
            <Flex.Item width={3}>
                <ButtonCircle disabled align="left" icon="loader">
                    Align Left
                </ButtonCircle>
            </Flex.Item>

            <Flex.Item width={3}>
                <ButtonCircle disabled align="right" icon="loader">
                    Align Left
                </ButtonCircle>
            </Flex.Item>
        </Flex>

    )
}

export default ButtonCircleExampleDisabled
