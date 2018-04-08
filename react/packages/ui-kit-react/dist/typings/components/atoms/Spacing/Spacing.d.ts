/// <reference types="react" />
import * as React from "react";
export declare type SpacingValue = 0 | 3 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54 | 60;
export interface SpacingProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /**
     * Set this to true if you always want to create a wrapper, even for single childs.
     * This is useful if the child element does not support className.
     */
    wrap?: boolean;
    margin?: SpacingValue | "auto";
    marginBottom?: SpacingValue | "auto";
    marginLeft?: SpacingValue | "auto";
    marginRight?: SpacingValue | "auto";
    marginTop?: SpacingValue | "auto";
    padding?: SpacingValue;
    paddingBottom?: SpacingValue;
    paddingLeft?: SpacingValue;
    paddingRight?: SpacingValue;
    paddingTop?: SpacingValue;
}
/**
 * A component to add margins and paddings to components.
 * If it has only one child, those classes are added directly to the child to avoid unnecessary wrapper divs.
 */
export declare const Spacing: React.StatelessComponent<SpacingProps>;
