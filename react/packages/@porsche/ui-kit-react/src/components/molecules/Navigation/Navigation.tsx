import * as React from "react"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Breakpoint } from "../../../index"

import { NavigationDesktop } from "./NavigationDesktop"
import { NavigationMobile } from "./NavigationMobile"

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

const _meta: ComponentMeta = {
    name: "Navigation",
    type: META.TYPES.MOLECULE
}

/**
 * A responsive navigation bar.
 */
const _Navigation: React.StatelessComponent<NavigationProps> & Partial<MetaCategorizable> = (props) => {
    const { children, ...rest } = props

    return (
        <React.Fragment>
            <Breakpoint maxWidth="s">
                <NavigationMobile {...rest} />
            </Breakpoint>
            <Breakpoint minWidth="s">
                <NavigationDesktop {...rest} />
            </Breakpoint>
        </React.Fragment>
    )
}

_Navigation._meta = _meta

export const Navigation = _Navigation
