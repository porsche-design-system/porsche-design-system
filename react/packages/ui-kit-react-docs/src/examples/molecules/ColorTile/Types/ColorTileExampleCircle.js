import React from "react"
import { Flex, ColorTile } from "@porsche/ui-kit-react"

const ColorTileExampleCircle = () => {
    return (
        <Flex>
            <ColorTile color="DeepSkyBlue" secondaryColor="DeepPink" circle/>
            <ColorTile color="DeepSkyBlue" secondaryColor="DeepPink" circle size="huge" />
        </Flex>
    )
}

export default ColorTileExampleCircle
