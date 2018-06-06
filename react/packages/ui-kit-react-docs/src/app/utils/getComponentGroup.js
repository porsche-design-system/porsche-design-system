import * as componentLibrary from "@porsche/ui-kit-react"

import _ from "lodash/fp"

const getComponentGroup = (docInfo, componentName) => {
    return {
        [componentName]: {
            description: _.get("docBlock.description", docInfo[componentName]),
            props: _.get("props", docInfo[componentName])
        },
        ..._.flow(
            _.filter((component) => {
                return _.get("_meta.parent", component) === componentName
            }),
            _.map("_meta.name"),
            _.map((name) => {
                return {
                    name,
                    description: _.get("docBlock.description", docInfo[name]),
                    props: _.get("props", docInfo[name])
                }
            }),
            _.keyBy("name")
        )(componentLibrary)
    }
}

export default getComponentGroup
