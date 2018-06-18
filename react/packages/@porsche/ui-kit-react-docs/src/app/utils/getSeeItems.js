import * as componentLibrary from "@porsche/ui-kit-react"

import _ from "lodash/fp"

const getSeeItems = (docInfo, componentName) => {
    return _.map(({ description }) => {
        const seeMeta = _.get("_meta", componentLibrary[description])

        if (!seeMeta) return null
        const { type, name } = seeMeta

        return { description, name, type }
    }, _.filter(["title", "see"], _.get("docBlock.tags", docInfo[componentName])))
}

export default getSeeItems
