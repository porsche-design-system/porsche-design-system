/// <reference types="react" />
import * as React from "react";
import { MetaCategorizable } from "../../../types/MetaCategorizable";
export interface NavigationSection {
    key: string;
    label: string | JSX.Element;
    link?: string | (() => void);
    counter?: number;
    menu?: JSX.Element;
}
export interface NavigationProps {
    as?: string;
    className?: string;
    customAttributes?: {
        [key: string]: any;
    };
    sections: NavigationSection[];
}
export declare const Navigation: React.StatelessComponent<NavigationProps> & Partial<MetaCategorizable>;
