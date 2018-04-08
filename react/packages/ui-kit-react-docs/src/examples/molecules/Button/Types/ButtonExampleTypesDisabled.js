import React from "react"
import { Button, Flex } from "@porsche/ui-kit-react"

const ButtonExampleTypesDisabled = () => {
    return (
        <div>
            <Flex gap="grid">
                <Flex.Item width={3}>
                    <Button disabled type="default">
                        Default Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button disabled type="red">
                        Red Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button disabled type="blue">
                        Blue Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button disabled type="black">
                        Black Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid" style={{ paddingTop: "16px" }}>
                <Flex.Item width={3}>
                    <Button disabled type="acid-green">
                        Acid-Green Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button disabled type="ghost">
                        Ghost Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid">
                <Flex.Item width={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button disabled type="ghost-inverted">
                            Ghost Inverted Button
                        </Button>
                    </div>
                </Flex.Item>
            </Flex>
        </div>
    )
}

export default ButtonExampleTypesDisabled
