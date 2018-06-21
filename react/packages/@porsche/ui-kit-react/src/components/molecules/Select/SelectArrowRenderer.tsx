import * as React from "react"
import cx from "classnames"

import { Icon } from "../../../index"
import { prefix } from "../../../lib"

export const SelectArrowRenderer: React.StatelessComponent<any> = (props) => {
    return (
        <Icon
            name={props.isOpen ? "arrow_up_hair" : "arrow_down_hair"}
            className={cx(prefix("Select-icon"), { [prefix("Select-icon--open")]: props.isOpen })}
            {...{
                onMouseDown: props.onMouseDown
            }}
        />
    )
}
