import * as React from "react"
import cx from "classnames"
import * as ReactSelectPlus from "../../../frameworks/react-select-plus-1.1.0"
import { OptionRendererHandler, OptionValues } from "../../../frameworks/react-select-plus-1.1.0"
import { Input } from "../../../index"

import { ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"

import { SelectArrowRenderer } from "./SelectArrowRenderer"
import { CheckboxOptionRenderer } from "./CheckboxOptionRenderer"

export type SelectValue = string | number | string[]

export interface SelectOptionGroup {
    label: string,
    options: SelectOption[]
}

export interface SelectOption {
    value: string | number,
    label: string
}

export interface HydratedSelectOptionGroup {
    label: string,
    options: HydratedSelectOption[]
}

export interface HydratedSelectOption {
    value: string | number,
    label: string
    selected: boolean
}

export interface SelectProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

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
     * @param {SelectValue} value The proposed value after the change.
     * @param {SelectProps} data All props of the component.
     */
    onChange?: (value: SelectValue, data: SelectProps) => void

    /** The displayed options with option label and value. */
    options?: SelectOption[] | SelectOptionGroup[]

    /** The placeholder when no value is selected. */
    placeholder?: string

    /** Enables filtering options for single selects. Multi selects are always searchable. */
    searchable?: boolean

    /**
     * Called when the user changed the search value.
     * Note that the search value cannot be controlled directly, therefore the change is not a proposal.
     * @param {string | null} value The value that has changed. If the search was cleared, the value will be null.
     */
    onSearchChanged?: (value: string | null) => void

    /** The selected value. */
    value?: SelectValue
}

export interface SelectState {
    query: string // This is used to hide multiselect values when the user searches something
}

const _meta: ComponentMeta = {
    name: "Select",
    type: META.TYPES.MOLECULE
}

/**
 * A select compononent to select single or multiple values.
 * It switches between a custom, searchable dropdown on desktop browsers and a native selection on touch supported devices.
 * @see Checkbox
 * @see TextArea
 * @see Input
 */
export class Select extends React.PureComponent<SelectProps, SelectState> {
    static defaultProps = {
        searchable: true
    }

    static _meta: ComponentMeta = _meta

    state = {
        query: ""
    }

    private selectInput: any

    handleChange = (value: SelectOption) => {
        if (!this.props.onChange) {
            return
        }

        if (this.props.disabled) {
            return
        }

        if (Array.isArray(value)) {
            this.props.onChange(value.map((option) => { return option.value }), this.props)
        } else {
            this.props.onChange(value.value, this.props)
        }
    }

    handleInputChange = (value: string) => {
        if (this.props.disabled) {
            return
        }

        if (typeof value !== "string") {
            return
        }

        if (this.props.onSearchChanged) {
            this.props.onSearchChanged(value.length <= 0 ? null : value)
        }

        this.setState({
            query: value || ""
        })
    }

    handleSelectChange = (e: any) => {
        if (!this.props.onChange) {
            return
        }

        if (this.props.disabled) {
            return
        }

        if (!this.props.multi) {
            this.props.onChange(e.currentTarget.value, this.props)
        } else {
            const values = [...e.target.options].filter((o) => o.selected).map((o) => o.value)
            this.props.onChange(values, this.props)
        }
    }

    /**
     * Check if an option is selected or not.
     * @param option The option to check.
     * @param value The selected values.
     * @returns Bool if the option is selected or not.
     */
    isOptionSelected = (option: SelectOption, value: string | number | string[]): boolean => {
        if (!value) {
            return false
        } else if (!Array.isArray(value)) {
            return option.value.toString() === value.toString()
        } else {
            return value.includes(option.value.toString())
        }
    }

    /**
     * We need to tell the checkboxOptionRenderer which options got selected.
     * We do this by comparing the values of the options and value prop.
     * @param options The options of the select
     * @param value The selected values.
     * @returns Hydrated options, that include if they are selected or not.
     */
    hydrateOptions = (options: SelectOption[] | SelectOptionGroup[] | undefined, value: string | number | string[] | undefined | null): HydratedSelectOption[] | HydratedSelectOptionGroup[] => {
        if (!options) {
            return []
        }

        const results = []

        for (const option of options) {
            if ("options" in option) {
                const optionGroup = option as SelectOptionGroup // TODO: Remove with Typescript 2.7
                const element: HydratedSelectOptionGroup = {
                    label: option.label,
                    options: optionGroup.options.map((e) => {
                        return {
                            value: e.value,
                            label: e.label,
                            selected: value ? this.isOptionSelected(e, value) : false
                        }
                    })
                }
                results.push(element)
            } else {
                const optionValue = option as SelectOption // TODO: Remove with Typescript 2.7
                const element: HydratedSelectOption = {
                    value: optionValue.value,
                    label: optionValue.label,
                    selected: value ? this.isOptionSelected(optionValue, value) : false
                }
                results.push(element)
            }
        }

        return results as HydratedSelectOption[] | HydratedSelectOptionGroup[]
    }

    /**
     * Flattens a list of options or option groups to a flat list of options.
     */
    getFlatOptionsList = (options: HydratedSelectOption[] | HydratedSelectOptionGroup[]): HydratedSelectOption[] => {
        const list: HydratedSelectOption[] = []
        for (const option of options) {
            if ("options" in option) {
                const optionGroup = option as HydratedSelectOptionGroup // TODO: Remove with Typescript 2.7
                optionGroup.options.map((option) => { list.push(option) })
            } else {
                const optionValue = option as HydratedSelectOption // TODO: Remove with Typescript 2.7
                list.push(optionValue)
            }
        }
        return list
    }

    /**
     * Retunrs the SelectValue or SelectValue[] from hydrated options or option groups.
     * @param options The hydrated select options or option groups.
     * @param multi Wether multi select is enabled.
     * @returns The selected value or an array of selected values, compatible with <select> value typing.
     */
    getSelectedValues = (options: HydratedSelectOption[] | HydratedSelectOptionGroup[], multi: boolean): string | number | string[] => {
        if (options.length < 1) {
            return multi ? [] : ""
        }

        return this.getSelectedValuesFromOptions(this.getFlatOptionsList(options), multi)
    }

    /**
     * Returns the SelectValue or SelectValue[] from hydrated options.
     * @param options The hydrated select options.
     * @param multi Wether multi select is enabled.
     * @returns The selected value or an array of selected values
     */
    getSelectedValuesFromOptions = (options: HydratedSelectOption[], multi: boolean): string | number | string[] => {
        if (!this.props.value) {
            return multi ? [] : ""
        }

        const result = options.filter((e) => { return e.selected }).map((e) => { return `${e.value}` })

        if (!multi && result.length === 0) {
            return multi ? [] : ""
        } else if (!multi && result.length === 1) {
            return result[0]
        } else {
            return result
        }
    }

    /**
     * Combines all labels of the selected options to a comma separated string.
     * @param options The hydrated select options or option groups.
     * @returns Comma separated string of all selected values.
     */
    createCombinedLabelString = (options: HydratedSelectOption[] | HydratedSelectOptionGroup[]): string => {
        if (!options) {
            return ""
        }

        const labels: string[] = []
        for (const option of options) {
            if ("options" in option) {
                const optionGroup = option as HydratedSelectOptionGroup // TODO: Remove with Typescript 2.7
                optionGroup.options.filter((option) => { return option.selected }).map((option) => { labels.push(option.label) })
            } else {
                const optionValue = option as HydratedSelectOption // TODO: Remove with Typescript 2.7
                if (optionValue.selected) {
                    labels.push(option.label)
                }
            }
        }

        return labels.join(", ")
    }

    /**
     * Ok, so this is a hacky method to get the multi select to work.
     * Basically to enable "text-overflow: ellipsis" we need to put all the comma separated labels
     * of the selected options as label of the first option.
     * If only one option is selected, we don't need to do anything.
     */
    flattenValueLabelsIfNeeded = (options: HydratedSelectOption[] | HydratedSelectOptionGroup[]): HydratedSelectOption | HydratedSelectOption[] | undefined => {
        const flatOptions = this.getFlatOptionsList(options).filter((option) => { return option.selected })

        if (flatOptions.length <= 0) {
            return undefined
        }

        if (flatOptions.length === 1) {
            return flatOptions[0]
        }

        const combinedLabels = this.createCombinedLabelString(flatOptions)

        return flatOptions.map<HydratedSelectOption>((e, i) => {
            return {
                value: e.value,
                label: i === 0 ? combinedLabels : "",
                selected: e.selected
            }
        })
    }

    /** User Agent detection for android and iOS. */
    isMobile = (): boolean => {
        const userAgent = navigator.userAgent || navigator.vendor
        const w: any = window

        if (/android/i.test(userAgent)) {
            return true
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !w.MSStream) {
            return true
        }

        return false
    }

    bindSelect = (input: any) => { this.selectInput = input }

    focusSelect = () => {
        this.selectInput.focus()
    }

    render() {
        const {
            as,
            className,
            children,
            customAttributes,
            disabled,
            error,
            multi,
            noResultsLabel,
            onChange,
            options,
            placeholder,
            searchable,
            value,
            onSearchChanged,
            ...rest
        } = this.props

        const selectOptions = this.hydrateOptions(options, value)

        if (this.isMobile()) {
            return (
                <Input
                    className={className}
                    basic
                    value={this.createCombinedLabelString(selectOptions)}
                    placeholder={placeholder || "Select…"}
                    icon="arrow_down_hair"
                    error={!!error}
                    customAttributes={{
                        ...customAttributes,
                        onFocus: this.focusSelect,
                        onTouchEnd: this.focusSelect,
                        readOnly: true
                    }}
                    {...rest}
                >
                    <select
                        className={prefix("mobile-select")}
                        value={this.getSelectedValues(selectOptions, !!multi)}
                        multiple={multi}
                        ref={this.bindSelect}
                        onChange={this.handleSelectChange}
                    >
                        {(selectOptions as (HydratedSelectOption | HydratedSelectOptionGroup)[]).map((o) => {
                            if ("options" in o) {
                                const optionGroup = o as HydratedSelectOptionGroup // TODO: Remove with Typescript 2.7
                                return (
                                    <optgroup key={o.label} label={o.label}>
                                        {optionGroup.options.map((e) => {
                                            return <option key={e.value} value={e.value}>{e.label}</option>
                                        })}
                                    </optgroup>
                                )
                            } else {
                                const optionValue = o as HydratedSelectOption // TODO: Remove with Typescript 2.7
                                return <option key={optionValue.value} value={optionValue.value}>{o.label}</option>
                            }
                        })}
                    </select>
                </Input>
            )
        } else {
            const selectValue = this.flattenValueLabelsIfNeeded(selectOptions)
            return (
                <ReactSelectPlus.default
                    arrowRenderer={SelectArrowRenderer}
                    className={cx(
                        className,
                        {[prefix("select-is-error")]: !!error},
                        {[prefix("select-has-query")]: this.state.query && this.state.query.length > 0}
                    )}
                    onChange={this.handleChange}
                    disabled={disabled}
                    clearable={false}
                    searchable={!!multi || !!searchable}
                    options={selectOptions}
                    value={selectValue}
                    multi={multi}
                    placeholder={placeholder}
                    autosize={false}
                    removeSelected={false}
                    noResultsText={noResultsLabel || ""}
                    closeOnSelect={!multi}
                    optionRenderer={(multi ? CheckboxOptionRenderer : undefined) as OptionRendererHandler<OptionValues>}
                    onSelectResetsInput={!multi}
                    onCloseResetsInput={true}
                    joinValues={true}
                    onInputChange={this.handleInputChange}
                    {...customAttributes}
                    {...rest}
                />
            )
        }
    }
}
