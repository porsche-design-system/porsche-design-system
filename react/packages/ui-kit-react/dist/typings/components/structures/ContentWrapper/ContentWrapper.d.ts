/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export interface ContentWrapperProps extends ClassNameProp, ComponentProp {
    /**
     * Render without max width and safe-area.
     * @default false
     */
    raw?: boolean
}
/**
 * This component is a direct child of "ThemeWrapper" and defines content sections like section, article.
 * It also adds safe area paddings to the left/right and a max-content-width.
 * Direct children of this component may only exist of organisms and molecules.
 */
export declare const ContentWrapper: React.StatelessComponent<ContentWrapperProps>
