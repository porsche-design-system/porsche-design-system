import React from "react"
import { Icon } from "@porsche/ui-kit-react"

Icon.registerIcons({
    test: (props) => {
        return (
            <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
                <rect width="48" height="48" />
            </svg>
        )
    }
})

const CustomIconsExample = () => {
    return <Icon name="test" size="huge" hoverColor="red-1" />
}

export default CustomIconsExample
