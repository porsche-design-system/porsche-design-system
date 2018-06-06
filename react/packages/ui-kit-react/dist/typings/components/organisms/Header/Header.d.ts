/// <reference types="react" />
import * as React from "react"
import { MetaCategorizable } from "../../../types/MetaCategorizable"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { NavigationSection } from "../../../index"
export interface HeaderProps extends ClassNameProp, ComponentProp {
    /** The navigation sections to be displayed. */
    sections: NavigationSection[]
    /** The element type of the logo. */
    logoComponent?: string | React.ComponentClass
    /** Custom props of the logo. */
    logoProps?: object
}
/**
 * The page header with logo and navigation bar
 */
export declare const Header: React.StatelessComponent<HeaderProps> & Partial<MetaCategorizable>
