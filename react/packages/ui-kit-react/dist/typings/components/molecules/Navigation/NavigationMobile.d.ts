/// <reference types="react" />
import * as React from "react"
import { ComponentMeta } from "../../../types/MetaCategorizable"
import { NavigationSection, NavigationProps } from "./Navigation"
export interface NavigationMobileState {
    isOpened: boolean
    openedSectionKey?: string
}
/**
 * A navigation bar intended for smaller screen sizes.
 */
export declare class NavigationMobile extends React.PureComponent<NavigationProps, NavigationMobileState> {
    static defaultProps: {
        as: string
    }
    static _meta: ComponentMeta
    state: NavigationMobileState
    openNav: () => void
    closeNav: () => void
    renderSectionRow: (section: NavigationSection) => JSX.Element
    renderSectionLabel: (label: string | JSX.Element, counter?: number | undefined) => string | JSX.Element
    resetOpenedSectionKey: () => void
    resetEvenMore: () => void
    renderSectionOverlay: (section: NavigationSection) => JSX.Element
    render(): JSX.Element
}
