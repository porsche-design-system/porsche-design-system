import React from "react"
import { Loader } from "@porsche/ui-kit-react"

const LoaderExampleInverted = () => {
    return (
        <div style={{ padding: "20px", width: "90px", backgroundColor: "black" }}>
            <Loader inverted size="small" />
            <Loader inverted />
        </div>
    )
}

export default LoaderExampleInverted
