import * as React from "react"
import { Icon, IconName } from "../../atoms/Icon/Icon"
import { prefix } from "../../../lib"
import { ButtonCircle } from "../../../index"
import { TableContextMenuItemComponent } from "./TableContextMenuItem"
import { TableContextMenuItem } from "./Table"

export interface TableContextMenuProps {
    items: TableContextMenuItem[]
}

export const TableContextMenu: React.SFC<TableContextMenuProps> = (props) => {
    const {
        items
    } = props

    return (
        <div className={prefix("table__menu")}>
            <Icon name="menu_dots_vertical" />
            <div className={prefix("table__menu__container")}>
                <ul>
                    {items.length > 0 && items.map((item) => {
                        return (
                            <TableContextMenuItemComponent key={item.id} item={item} />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
