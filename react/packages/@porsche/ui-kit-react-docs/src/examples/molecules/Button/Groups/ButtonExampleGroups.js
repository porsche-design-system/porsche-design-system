import React from "react"
import { Button, Spacing } from "@porsche/ui-kit-react"

const ButtonExampleGroups = () => {
    return (
        <div>
            <Button.Group>
                <Button type="ghost">Ghost Button</Button>
                <Button type="highlight">Highlight Button</Button>
                <Button type="sales">Sales Button</Button>
            </Button.Group>

            <Spacing marginTop={30}>
                <Button.Group direction="vertical">
                    <Button type="ghost">Ghost Button</Button>
                    <Button type="highlight">Highlight Button</Button>
                    <Button type="sales">Sales Button</Button>
                </Button.Group>
            </Spacing>
        </div>
    )
}

export default ButtonExampleGroups
