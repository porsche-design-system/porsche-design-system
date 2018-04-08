import * as componentLibrary from "@porsche/ui-kit-react"

import ComponentDoc from "../Components/ComponentDoc"
import { META } from "src/app/utils"
import PropTypes from "prop-types"
import React from "react"
import _ from "lodash/fp"

const DocsRoot = (props) => {
    const { name } = props.match.params
    const componentName = _.startCase(name).replace(/ /g, "")
    const component = componentLibrary[componentName]

    if (!component || !component._meta || !META.isParent(component)) return null
    return (
        <ComponentDoc
            name={component._meta.name}
            parent={component._meta.parent}
            type={component._meta.type}
        />
    )
}

DocsRoot.propTypes = {
    children: PropTypes.node,
    match: PropTypes.shape({
        params: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    })
}

export default DocsRoot
