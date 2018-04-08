import React from "react"
import { Button, Flex } from "@porsche/ui-kit-react"

const ButtonExampleTypesError = () => {
    return (
        <div>
            <Flex gap="grid">
                <Flex.Item width={3}>
                    <Button error type="default">
                        Default Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button error type="red">
                        Red Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button error type="blue">
                        Blue Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button error type="black">
                        Black Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid" style={{ paddingTop: "16px" }}>
                <Flex.Item width={3}>
                    <Button error type="acid-green">
                        Acid-Green Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button error type="ghost">
                        Ghost Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid">
                <Flex.Item width={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button error type="ghost-inverted">
                            Ghost Inverted Button
                        </Button>
                    </div>
                </Flex.Item>
            </Flex>
        </div>
    )
}

export default ButtonExampleTypesError
