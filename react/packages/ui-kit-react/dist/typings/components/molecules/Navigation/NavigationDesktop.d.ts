/// <reference types="react" />
import * as React from "react"
import { ComponentMeta } from "../../../types/MetaCategorizable"
import { NavigationSection, NavigationProps } from "./Navigation"
export interface NavigationDesktopState {
    hoveredSectionKey?: string
    isActive: boolean
}
/**
 * A navigation bar intended for larger screen sizes.
 */
export declare class NavigationDesktop extends React.PureComponent<NavigationProps, NavigationDesktopState> {
    static defaultProps: {
        as: string
    }
    static _meta: ComponentMeta
    state: NavigationDesktopState
    renderSection: (section: NavigationSection) => JSX.Element
    renderLabel: (label: string | JSX.Element, counter?: number | undefined) => string | JSX.Element
    renderFlyout: (section: NavigationSection) => JSX.Element | null
    onSectionHovered: (key: string) => void
    onSectionUnhovered: () => void
    render(): JSX.Element
}
