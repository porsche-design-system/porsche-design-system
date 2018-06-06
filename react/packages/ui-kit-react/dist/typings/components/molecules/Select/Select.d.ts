/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { ComponentMeta } from "../../../types/MetaCategorizable"
export declare type SelectValue = string | number | string[]
export interface SelectOptionGroup {
    label: string
    options: SelectOption[]
}
export interface SelectOption {
    value: string | number
    label: string
}
export interface HydratedSelectOptionGroup {
    label: string
    options: HydratedSelectOption[]
}
export interface HydratedSelectOption {
    value: string | number
    label: string
    selected: boolean
}
export interface SelectProps extends ClassNameProp, ComponentProp {
    /**
     * Determines if the placeholder disappears when a value is set or entered,
     * or if it floats above the content.
     * If no placeholder is set, this value has no effect.
     * @default false
     */
    basic?: boolean
    /**
     * Determines if the select shows an icon to clear selected values.
     * @default true
     */
    clearable?: boolean
    /** Disable the select. */
    disabled?: boolean
    /** Color the select to show that something went wrong. */
    error?: boolean
    /** Allow multiple selections. */
    multi?: boolean
    /** Display a text when the filter shows no results. */
    noResultsLabel?: string | JSX.Element
    /**
     * Called when the user attempts to change the selection.
     * @param {SelectValue | null} value The proposed value after the change.
     * @param {SelectProps} data All props of the component.
     */
    onChange?: (value: SelectValue | null, data: SelectProps) => void
    /** The displayed options with option label and value. */
    options?: SelectOption[] | SelectOptionGroup[]
    /** The placeholder when no value is selected. */
    placeholder?: string
    /** Enables filtering options for single selects. Multi selects are always searchable. */
    searchable?: boolean
    /**
     * Called when the user changed the search value.
     * Note that the search value cannot be controlled directly, therefore the change is not a proposal.
     * Mobile behaviour is disabled if this value is set, since mobile doesn't allow for keyboard input.
     * @param {string | null} value The value that has changed. If the search was cleared, the value will be null.
     */
    onSearchChanged?: (value: string | null) => void
    /** The selected value. */
    value?: SelectValue | null
    /**
     * You can customize the filter behaviour of the select component by providing a custom function.
     */
    filterOptions?: (
        option: SelectOption[] | SelectOptionGroup[],
        filter: string
    ) => SelectOption[] | SelectOptionGroup[]
}
export interface SelectState {
    query: string
}
/**
 * A select compononent to select single or multiple values.
 * It switches between a custom, searchable dropdown on desktop browsers and a native selection on touch supported devices.
 * @see Checkbox
 * @see TextArea
 * @see Input
 */
export declare class Select extends React.PureComponent<SelectProps, SelectState> {
    static defaultProps: {
        searchable: boolean
        basic: boolean
        clearable: boolean
    }
    static _meta: ComponentMeta
    state: {
        query: string
    }
    private selectInput
    handleChange: (value: SelectOption | null) => void
    handleInputChange: (value: string) => void
    handleSelectChange: (e: any) => void
    /**
     * Check if an option is selected or not.
     * @param option The option to check.
     * @param value The selected values.
     * @returns Bool if the option is selected or not.
     */
    isOptionSelected: (option: SelectOption, value: string | number | string[]) => boolean
    /**
     * We need to tell the checkboxOptionRenderer which options got selected.
     * We do this by comparing the values of the options and value prop.
     * @param options The options of the select
     * @param value The selected values.
     * @returns Hydrated options, that include if they are selected or not.
     */
    hydrateOptions: (
        options: SelectOption[] | SelectOptionGroup[] | undefined,
        value: string | number | string[] | null | undefined
    ) => HydratedSelectOption[] | HydratedSelectOptionGroup[]
    /**
     * Flattens a list of options or option groups to a flat list of options.
     */
    getFlatOptionsList: (options: HydratedSelectOption[] | HydratedSelectOptionGroup[]) => HydratedSelectOption[]
    /**
     * Retunrs the SelectValue or SelectValue[] from hydrated options or option groups.
     * @param options The hydrated select options or option groups.
     * @param multi Wether multi select is enabled.
     * @returns The selected value or an array of selected values, compatible with <select> value typing.
     */
    getSelectedValues: (
        options: HydratedSelectOption[] | HydratedSelectOptionGroup[],
        multi: boolean
    ) => string | number | string[]
    /**
     * Returns the SelectValue or SelectValue[] from hydrated options.
     * @param options The hydrated select options.
     * @param multi Wether multi select is enabled.
     * @returns The selected value or an array of selected values
     */
    getSelectedValuesFromOptions: (options: HydratedSelectOption[], multi: boolean) => string | number | string[]
    /**
     * Combines all labels of the selected options to a comma separated string.
     * @param options The hydrated select options or option groups.
     * @returns Comma separated string of all selected values.
     */
    createCombinedLabelString: (options: HydratedSelectOption[] | HydratedSelectOptionGroup[]) => string
    /**
     * Ok, so this is a hacky method to get the multi select to work.
     * Basically to enable "text-overflow: ellipsis" we need to put all the comma separated labels
     * of the selected options as label of the first option.
     * If only one option is selected, we don't need to do anything.
     */
    flattenValueLabelsIfNeeded: (
        options: HydratedSelectOption[] | HydratedSelectOptionGroup[]
    ) => HydratedSelectOption | HydratedSelectOption[] | undefined
    /** User Agent detection for android and iOS. */
    isMobile: () => boolean
    preventDefault: (e: any) => void
    bindSelect: (input: any) => void
    focusSelect: () => void
    render(): JSX.Element
}
