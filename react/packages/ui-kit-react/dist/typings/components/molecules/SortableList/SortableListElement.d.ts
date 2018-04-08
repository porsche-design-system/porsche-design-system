/// <reference types="react" />
import * as React from "react";
import { SortableElementProps } from "react-sortable-hoc";
import { SortableListItem } from "./SortableList";
export interface SortableListElementProps {
    item: SortableListItem;
}
export declare const SortableListElement: React.ComponentClass<SortableListElementProps & SortableElementProps>;
