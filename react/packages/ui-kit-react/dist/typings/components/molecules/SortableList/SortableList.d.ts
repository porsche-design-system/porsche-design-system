/// <reference types="react" />
import * as React from "react";
export interface SortableListItem {
    key: string;
    label: string;
}
export interface SortableListProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** An array of sortable list items with a key and a label. */
    value: SortableListItem[];
    /**
     * Called when the user finishes sorting the list.
     * @param {SortableListItem[]} value The list items after the sort.
     * @param {SortableListProps} data All props of the component.
     */
    onChange: (value: SortableListItem[], data: SortableListProps) => void;
}
/**
 * A list where you can sort items via drag and drop.
 */
export declare const SortableList: React.StatelessComponent<SortableListProps>;
