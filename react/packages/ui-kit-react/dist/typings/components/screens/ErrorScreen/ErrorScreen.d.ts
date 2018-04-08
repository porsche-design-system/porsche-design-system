/// <reference types="react" />
import * as React from "react";
export interface ErrorScreenProps {
    /** The title of the error screen, displayed very large. */
    title: string;
    /** The text under the large title. */
    text: string;
}
/**
 * A generic error screen with a title and a text.
 */
export declare const ErrorScreen: React.StatelessComponent<ErrorScreenProps>;
