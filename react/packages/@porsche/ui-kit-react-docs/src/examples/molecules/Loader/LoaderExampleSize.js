import React from "react"
import { Flex, Loader } from "@porsche/ui-kit-react"

const LoaderExampleSize = () => {
    return (
        <React.Fragment>
            <Flex>
                <Flex.Item>
                    <Loader size="x-small" />
                </Flex.Item>
                <Flex.Item>
                    <Loader size="small" />
                </Flex.Item>
                <Flex.Item>
                    <Loader size="medium" />
                </Flex.Item>
                <Flex.Item>
                    <Loader size="large" />
                </Flex.Item>
                <Flex.Item>
                    <Loader size="x-large" />
                </Flex.Item>
            </Flex>
        </React.Fragment>
    )
}

export default LoaderExampleSize
