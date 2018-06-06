/// <reference types="react" />
import * as React from "react"
import { MetaCategorizable } from "../../../types/MetaCategorizable"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export interface NavigationSection {
    key: string
    label: string | JSX.Element
    counter?: number
    menu?: JSX.Element
    component?: React.ComponentClass
    props?: object
}
export interface NavigationProps extends ClassNameProp, ComponentProp {
    /** The navigation sections to be displayed. */
    sections: NavigationSection[]
}
export declare const Navigation: React.StatelessComponent<NavigationProps> & Partial<MetaCategorizable>
