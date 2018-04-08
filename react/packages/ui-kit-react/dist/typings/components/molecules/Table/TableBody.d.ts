/// <reference types="react" />
import * as React from "react";
import { ComponentMeta } from "../../../types/MetaCategorizable";
export interface TableBodyProps {
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
 * A TableBody.
 */
export declare class TableBody extends React.PureComponent<TableBodyProps> {
    static _meta: ComponentMeta;
    render(): JSX.Element;
}
