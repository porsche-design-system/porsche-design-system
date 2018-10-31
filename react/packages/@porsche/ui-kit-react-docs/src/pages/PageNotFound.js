import { Flex, Text } from "@porsche/ui-kit-react"

import React from "react"

const PageNotFound = () => {
    return (
        <Flex className="docs-404" alignMainAxis="center" alignCrossAxis="center">
            <div>
                <Text as="h1" type="1-bold" align="center">
                    404
                </Text>
                <Text align="center">Uh oh. Somebody took a wrong turn somewhere.</Text>
            </div>
        </Flex>
    )
}

export default PageNotFound
