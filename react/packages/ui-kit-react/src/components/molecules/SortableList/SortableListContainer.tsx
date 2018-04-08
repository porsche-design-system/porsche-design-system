import * as React from "react"
import cx from "classnames"
import {SortableContainer, SortableContainerProps } from "react-sortable-hoc"
import { prefix } from "../../../lib"

import { SortableListItem } from "./SortableList"
import { SortableListElement } from "./SortableListElement"

export interface SortableListContainerProps {
    items: SortableListItem[]
}

export const SortableListContainer = SortableContainer((props: SortableListContainerProps) => {
    const classes = cx(
        prefix("sortable-list__container")
    )

    return (
        <ul className={classes}>
            {props.items.map((item, index) => {
                return (
                    <SortableListElement key={item.key} item={item} index={index}/>
                )
            })}
        </ul>
    )
})
