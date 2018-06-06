import React from "react"
import { Button, Flex } from "@porsche/ui-kit-react"

const ButtonExampleLongTitle = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={3}>
                <Button>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Flex.Item>

            <Flex.Item width={3}>
                <Button error>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Flex.Item>

            <Flex.Item width={3}>
                <Button disabled>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Flex.Item>

            <Flex.Item width={3}>
                <Button loading>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                </Button>
            </Flex.Item>
        </Flex>
    )
}

export default ButtonExampleLongTitle
