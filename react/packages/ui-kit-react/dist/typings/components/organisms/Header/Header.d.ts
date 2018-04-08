/// <reference types="react" />
import * as React from "react";
import { MetaCategorizable } from "../../../types/MetaCategorizable";
import { NavigationSection } from "../../../index";
export interface HeaderProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** The navigation sections to be displayed. */
    sections: NavigationSection[];
    /** Callback when the logo is clicked. */
    onLogoClick?: () => void;
}
/**
 * The page header with logo and navigation bar
 */
export declare const Header: React.StatelessComponent<HeaderProps> & Partial<MetaCategorizable>;
