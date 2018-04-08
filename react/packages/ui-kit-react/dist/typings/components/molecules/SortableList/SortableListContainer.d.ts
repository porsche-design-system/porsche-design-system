/// <reference types="react" />
import * as React from "react";
import { SortableContainerProps } from "react-sortable-hoc";
import { SortableListItem } from "./SortableList";
export interface SortableListContainerProps {
    items: SortableListItem[];
}
export declare const SortableListContainer: React.ComponentClass<SortableListContainerProps & SortableContainerProps>;
