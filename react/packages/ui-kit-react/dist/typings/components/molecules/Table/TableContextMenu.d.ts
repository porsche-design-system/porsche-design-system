/// <reference types="react" />
import * as React from "react";
import { TableContextMenuItem } from "./Table";
export interface TableContextMenuProps {
    items: TableContextMenuItem[];
}
export declare const TableContextMenu: React.SFC<TableContextMenuProps>;
