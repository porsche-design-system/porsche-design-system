import * as React from "react"

import { Icon } from "../../../index"
import { prefix } from "../../../lib"

export const SelectClearRenderer: React.StatelessComponent<any> = (props) => {
    return <Icon name={"cancel"} className={prefix("Select-clear")} />
}
