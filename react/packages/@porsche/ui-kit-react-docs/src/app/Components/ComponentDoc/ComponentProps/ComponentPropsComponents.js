import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import { Menu } from "semantic-ui-react"

import { updateForKeys } from "src/app/HOC"
import ComponentPropsSubComponent from "./ComponentPropsComponent"

const ComponentPropsComponents = ({ activeName, components, onItemClick, parent }) => {
    return (
        components.length > 1 && (
            <Menu color="blue" compact secondary>
                {_.map(components, (component) => {
                    return (
                        <ComponentPropsSubComponent
                            active={activeName === component}
                            key={component}
                            name={component}
                            onClick={onItemClick}
                            parent={parent}
                        />
                    )
                })}
            </Menu>
        )
    )
}

ComponentPropsComponents.propTypes = {
    activeName: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    components: PropTypes.array,
    onItemClick: PropTypes.func,
    parent: PropTypes.string.isRequired
}

export default updateForKeys(["activeName", "parent"])(ComponentPropsComponents)
