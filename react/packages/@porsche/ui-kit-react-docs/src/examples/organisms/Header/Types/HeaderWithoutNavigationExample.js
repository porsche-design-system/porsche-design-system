import React from "react"
import { Header } from "@porsche/ui-kit-react"

const HeaderWithoutNavigationExample = () => (
    <Header
        sections={[]}
        logoComponent={"a"}
        logoProps={{
            href: "#"
        }}
    />
)

export default HeaderWithoutNavigationExample
