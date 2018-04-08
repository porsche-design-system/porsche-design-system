/// <reference types="react" />
import * as React from "react";
import { ComponentMeta } from "../../../types/MetaCategorizable";
import { TableContextMenuItem } from "./Table";
export interface TableRowProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** Adds a context menu to the end of the row for further actions. */
    contextMenuItems?: TableContextMenuItem[];
    /**
     * Called after a user's click.
     * @param {React.SyntheticEvent<HTMLElement>} event React's original event.
     * @param {TableRowProps} data The props of the component.
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>, data: TableRowProps) => void;
}
/**
 * A TableRow.
 */
export declare class TableRow extends React.PureComponent<TableRowProps> {
    static _meta: ComponentMeta;
    handleClick: (e: React.SyntheticEvent<HTMLElement>) => void;
    render(): JSX.Element;
}
