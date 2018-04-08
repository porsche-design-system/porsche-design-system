/// <reference types="react" />
import * as React from "react";
import { ComponentMeta } from "../../../types/MetaCategorizable";
import { IconName } from "../../atoms/Icon/Icon";
import { TableHeader } from "./TableHeader";
import { TableHeaderCell } from "./TableHeaderCell";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
export interface TableContextMenuItem {
    id: string;
    icon: IconName;
    label: string | JSX.Element;
    onClick: (event: React.SyntheticEvent<HTMLElement>, data: TableContextMenuItem) => void;
}
export interface TableProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
}
/**
 * A Table.
 */
export declare class Table extends React.PureComponent<TableProps> {
    static Header: typeof TableHeader;
    static HeaderCell: typeof TableHeaderCell;
    static Body: typeof TableBody;
    static Row: typeof TableRow;
    static Cell: typeof TableCell;
    static _meta: ComponentMeta;
    render(): JSX.Element;
}
