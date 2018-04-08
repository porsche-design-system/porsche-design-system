import * as React from "react"
import { prefix } from "../../../lib"
import { ButtonCircle } from "../../../index"
import { TableContextMenuItem } from "./Table"

export interface TableContextMenuItemProps {
    item: TableContextMenuItem
}

export const TableContextMenuItemComponent: React.SFC<TableContextMenuItemProps> = (props) => {
    const {
        id,
        icon,
        label,
        onClick
    } = props.item

    const handleClick = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
        onClick(e, props.item)
    }

    return (
        <li className={prefix("table__menu__item")}>
            <ButtonCircle icon={icon} onClick={handleClick}>
                {label}
            </ButtonCircle>
        </li>
    )
}
