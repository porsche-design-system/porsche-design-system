import React from "react"
import { Flex, ColorTile } from "@porsche/ui-kit-react"

const ColorTileExampleSizes = () => {
    return (
        <Flex>
            <ColorTile color="DeepSkyBlue" secondaryColor="DeepPink" />
            <ColorTile color="DeepSkyBlue" secondaryColor="DeepPink" size="huge" />
        </Flex>
    )
}

export default ColorTileExampleSizes
