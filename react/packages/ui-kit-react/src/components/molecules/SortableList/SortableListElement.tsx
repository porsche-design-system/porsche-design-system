import * as React from "react"
import cx from "classnames"
import {SortableElement, SortableElementProps } from "react-sortable-hoc"
import { Icon, Flex, Spacing } from "../../../index"
import { prefix } from "../../../lib"

import { SortableListItem } from "./SortableList"

export interface SortableListElementProps {
    item: SortableListItem
}

export const SortableListElement = SortableElement((props: SortableListElementProps) => {
    const classes = cx(
        prefix("sortable-list__element")
    )

    return (
        <li className={classes}>
            <Spacing marginLeft={12} marginRight={12}>
                <Icon name="list" size="medium"/>
            </Spacing>
            {props.item.label}
        </li>
    )
})
