import React from "react"
import { Button } from "@porsche/ui-kit-react"

const ButtonExampleGroupsResponsive = () => {
    return (
        <Button.Group direction={{ base: "vertical", m: "horizontal" }}>
            <Button type="ghost">Ghost Button</Button>
            <Button type="highlight">Highlight Button</Button>
            <Button type="sales">Sales Button</Button>
        </Button.Group>
    )
}

export default ButtonExampleGroupsResponsive
