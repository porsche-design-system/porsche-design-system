/// <reference types="react" />
import * as React from "react";
import { ComponentMeta } from "../../../types/MetaCategorizable";
export interface TableHeaderCellProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** The relative width of the header. */
    grow?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    /**
     * Called after a user's click.
     * @param {React.SyntheticEvent<HTMLElement>} event React's original event.
     * @param {TableHeaderCellProps} data The props of the component.
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>, data: TableHeaderCellProps) => void;
    /** Displays an arrow for ascending or descending order. */
    sorted?: "ascending" | "descending";
}
/**
 * A TableHeaderCell.
 */
export declare class TableHeaderCell extends React.PureComponent<TableHeaderCellProps> {
    static _meta: ComponentMeta;
    handleClick: (e: React.SyntheticEvent<HTMLElement>) => void;
    render(): JSX.Element;
}
