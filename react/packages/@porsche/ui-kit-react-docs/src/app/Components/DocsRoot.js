import ComponentDoc from "../Components/ComponentDoc"
import PropTypes from "prop-types"
import React from "react"
import _ from "lodash/fp"
import { getStoryByName } from "src/app/stories"

const DocsRoot = (props) => {
    const { name } = props.match.params
    const componentName = _.startCase(name).replace(/ /g, "")
    const story = getStoryByName(componentName)

    if (!story || !story.name || !story.type) return null
    return <ComponentDoc name={story.name} type={story.type} />
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
