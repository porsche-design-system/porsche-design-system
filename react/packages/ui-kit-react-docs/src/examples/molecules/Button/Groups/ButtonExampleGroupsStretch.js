import React from "react"
import { Button, Flex } from "@porsche/ui-kit-react"

const ButtonExampleGroupsStretch = () => {
    return (
        <Button.Group>
            <Button type="red" stretch>
            Button 1
            </Button>
            <Button type="black" stretch>
            Button 2
            </Button>
            <Button stretch>
            Button 3
            </Button>
        </Button.Group>
    )
}

export default ButtonExampleGroupsStretch
