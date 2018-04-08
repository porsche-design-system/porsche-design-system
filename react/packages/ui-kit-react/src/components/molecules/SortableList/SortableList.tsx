import * as React from "react"
import cx from "classnames"
import { SortEnd, SortEvent, arrayMove } from "react-sortable-hoc"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"

import { SortableListContainer } from "./SortableListContainer"
import { SortableListElement } from "./SortableListElement"

export interface SortableListItem {
    key: string
    label: string
}

export interface SortableListProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /** An array of sortable list items with a key and a label. */
    value: SortableListItem[]

    /**
     * Called when the user finishes sorting the list.
     * @param {SortableListItem[]} value The list items after the sort.
     * @param {SortableListProps} data All props of the component.
     */
    onChange: (value: SortableListItem[], data: SortableListProps) => void
}

const _meta: ComponentMeta = {
    name: "SortableList",
    type: META.TYPES.MOLECULE
}

const _SortableList: React.StatelessComponent<SortableListProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        value,
        onChange,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        className
    )

    const handleSortEnd = (sort: SortEnd, event: SortEvent) => {
        const update = arrayMove(value, sort.oldIndex, sort.newIndex)
        onChange(update, props)
    }

    return (
        <ElementType
            className={classes}
            {...customAttributes}
            {...rest}
        >
            <SortableListContainer
                axis="y"
                items={value}
                helperClass={prefix("sortable-list__element--dragging")}
                onSortEnd={handleSortEnd}
            />
        </ElementType>
    )
}

_SortableList._meta = _meta

/**
 * A list where you can sort items via drag and drop.
 */
export const SortableList = _SortableList as React.StatelessComponent<SortableListProps>
