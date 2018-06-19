import PropTypes from "prop-types"
import React from "react"
import { Icon, Menu } from "semantic-ui-react"

import { updateForKeys } from "src/app/HOC"
import ComponentControlsToolTip from "./ComponentControlsToolTip"

const ComponentControlsEditCode = ({ active, onClick }) => {
    return (
        <ComponentControlsToolTip content="Edit Code">
            <Menu.Item active={active} onClick={onClick}>
                <Icon color={active ? "green" : "grey"} fitted name="code" size="large" />
            </Menu.Item>
        </ComponentControlsToolTip>
    )
}

ComponentControlsEditCode.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func
}

export default updateForKeys(["active"])(ComponentControlsEditCode)
