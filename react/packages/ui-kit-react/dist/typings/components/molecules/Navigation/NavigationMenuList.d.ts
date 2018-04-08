/// <reference types="react" />
import * as React from "react";
import * as PropTypes from "prop-types";
export declare type NavigationMenuListType = "default" | "categorized";
export interface NavigationMenuListItem {
    key: string;
    label: string | JSX.Element;
    link?: string | (() => void);
}
export interface NavigationMenuListCategory {
    key: string;
    label?: string | JSX.Element;
    items?: NavigationMenuListItem[];
}
export interface NavigationMenuListProps {
    as?: string;
    className?: string;
    customAttributes?: {
        [key: string]: any;
    };
    type?: NavigationMenuListType;
    categories?: NavigationMenuListCategory[];
    mobile?: boolean;
}
export declare const propTypes: {
    as: PropTypes.Requireable<any>;
    className: PropTypes.Requireable<any>;
    type: PropTypes.Requireable<any>;
    contents: PropTypes.Requireable<any>;
};
export declare const NavigationMenuList: React.StatelessComponent<NavigationMenuListProps>;
