/// <reference types="react" />
import * as React from "react";
import { ComponentMeta } from "../../../types/MetaCategorizable";
export interface TableHeaderProps {
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
 * A TableHeader.
 */
export declare class TableHeader extends React.PureComponent<TableHeaderProps> {
    static _meta: ComponentMeta;
    render(): JSX.Element;
}
