import React from "react"
import { Button, Flex } from "@porsche/ui-kit-react"

const ButtonExampleTypesStretch = () => {
    return (
        <div>
            <Flex gap="grid">
                <Flex.Item width={3}>
                    <Button stretch type="default">
                        Default Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button stretch type="red">
                        Red Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button stretch type="blue">
                        Blue Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button stretch type="black">
                        Black Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid" style={{ paddingTop: "16px" }}>
                <Flex.Item width={3}>
                    <Button stretch type="acid-green">
                        Acid-Green Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button stretch type="ghost">
                        Ghost Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button stretch centered type="default">
                        Streched and centered Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid">
                <Flex.Item width={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button stretch type="ghost-inverted">
                            Ghost Inverted Button
                        </Button>
                    </div>
                </Flex.Item>
            </Flex>
        </div>
    )
}

export default ButtonExampleTypesStretch
