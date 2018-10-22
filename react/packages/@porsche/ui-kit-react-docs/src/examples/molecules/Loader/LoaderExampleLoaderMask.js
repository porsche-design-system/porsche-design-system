import React from "react"
import { Loader } from "@porsche/ui-kit-react"

const LoaderExampleBasic = () => {
    return (
        <div style={{ height: "300px", backgroundColor: "black" }}>
            <Loader.Mask loading />
        </div>
    )
}

export default LoaderExampleBasic
