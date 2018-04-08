/// <reference types="react" />
import * as React from "react";
import { ComponentMeta } from "../../../types/MetaCategorizable";
export interface TableCellProps {
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
     * @param {TableCellProps} data The props of the component.
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>, data: TableCellProps) => void;
}
/**
 * A TableCell.
 */
export declare class TableCell extends React.PureComponent<TableCellProps> {
    static _meta: ComponentMeta;
    handleClick: (e: React.SyntheticEvent<HTMLElement>) => void;
    render(): JSX.Element;
}
