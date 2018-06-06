/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export interface NavigationMenuListItem {
    key: string
    label: string | JSX.Element
    component?: string | React.ComponentClass
    props?: object
}
export interface NavigationMenuListSubmenu {
    key: string
    label?: string | JSX.Element
    items?: NavigationMenuListItem[]
}
export interface NavigationMenuListProps extends ClassNameProp, ComponentProp {
    /** The display type of the list. */
    type?: "default" | "categorized"
    submenu?: NavigationMenuListSubmenu[]
    mobile?: boolean
}
export declare const NavigationMenuList: React.StatelessComponent<NavigationMenuListProps>
