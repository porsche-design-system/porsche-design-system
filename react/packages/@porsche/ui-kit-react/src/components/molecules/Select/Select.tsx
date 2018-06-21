import * as React from "react"
import cx from "classnames"

import * as ReactSelectPlus from "./react-select-plus-1.1.0"
import { Input, Icon } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix, getElementType } from "../../../lib"

import { SelectArrowRenderer } from "./SelectArrowRenderer"
import { SelectClearRenderer } from "./SelectClearRenderer"

import { CheckboxOptionRenderer } from "./CheckboxOptionRenderer"

export type SelectValue = string | number | string[]

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
        searchable: true,
        basic: false,
        clearable: true
    }

    static _meta: ComponentMeta = _meta

    state = {
        query: ""
    }

    private selectInput: any

    handleChange = (value: SelectOption | null) => {
        if (!this.props.onChange) {
            return
        }

        if (this.props.disabled) {
            return
        }

        if (Array.isArray(value)) {
            this.props.onChange(
                value.map((option) => {
                    return option.value
                }),
                this.props
            )
        } else {
            this.props.onChange(value && value.value, this.props)
        }
    }

    handleInputChange = (value: string) => {
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
            query: value || ""
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
            this.props.onChange(e.currentTarget.value !== "" ? e.currentTarget.value : null, this.props)
        } else {
            const values = Array.from(e.currentTarget.selectedOptions).map((o: any) => o.value)
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
            let included = false
            value.forEach((v: any) => {
                if (option.value.toString() === v.toString()) {
                    included = true
                }
            })
            return included
        }
    }

    /**
     * We need to tell the checkboxOptionRenderer which options got selected.
     * We do this by comparing the values of the options and value prop.
     * @param options The options of the select
     * @param value The selected values.
     * @returns Hydrated options, that include if they are selected or not.
     */
    hydrateOptions = (
        options: SelectOption[] | SelectOptionGroup[] | undefined,
        value: string | number | string[] | undefined | null
    ): HydratedSelectOption[] | HydratedSelectOptionGroup[] => {
        if (!options) {
            return []
        }

        const results: (HydratedSelectOption | HydratedSelectOptionGroup)[] = []

        for (const option of options) {
            if ("options" in option) {
                const element: HydratedSelectOptionGroup = {
                    label: option.label,
                    options: option.options.map((e) => {
                        return {
                            value: e.value,
                            label: e.label,
                            selected: value ? this.isOptionSelected(e, value) : false
                        }
                    })
                }
                results.push(element)
            } else {
                const element: HydratedSelectOption = {
                    value: option.value,
                    label: option.label,
                    selected: value ? this.isOptionSelected(option, value) : false
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
        for (const opt of options) {
            if ("options" in opt) {
                opt.options.map((option) => {
                    list.push(option)
                })
            } else {
                list.push(opt)
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
    getSelectedValues = (
        options: HydratedSelectOption[] | HydratedSelectOptionGroup[],
        multi: boolean
    ): string | number | string[] => {
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

        const result = options
            .filter((e) => {
                return e.selected
            })
            .map((e) => {
                return `${e.value}`
            })

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
        for (const opt of options) {
            if ("options" in opt) {
                opt.options
                    .filter((option) => {
                        return option.selected
                    })
                    .map((option) => {
                        labels.push(option.label)
                    })
            } else {
                if (opt.selected) {
                    labels.push(opt.label)
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
    flattenValueLabelsIfNeeded = (
        options: HydratedSelectOption[] | HydratedSelectOptionGroup[]
    ): HydratedSelectOption | HydratedSelectOption[] | undefined => {
        const flatOptions = this.getFlatOptionsList(options).filter((option) => {
            return option.selected
        })

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
        if (this.props.onSearchChanged) {
            return false
        }

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

    preventDefault = (e: any) => {
        e.preventDefault()
    }

    bindSelect = (input: any) => {
        this.selectInput = input
    }

    focusSelect = () => {
        if (this.props.disabled) {
            return
        }
        this.selectInput.focus()
    }

    render() {
        const {
            as,
            className,
            children,
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
            basic,
            clearable,
            filterOptions,
            ...rest
        } = this.props

        const ElementType = getElementType(as, "div")
        const selectOptions = this.hydrateOptions(options, value)

        const defaultPlaceholder = "Select…"
        const selectPlaceholder = placeholder !== undefined ? placeholder : defaultPlaceholder

        if (this.isMobile()) {
            return (
                <Input
                    className={className}
                    basic={basic}
                    disabled={disabled}
                    value={this.createCombinedLabelString(selectOptions)}
                    placeholder={selectPlaceholder}
                    icon="arrow_down_hair"
                    error={!!error}
                    {...{
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
                        disabled={disabled}
                        ref={this.bindSelect}
                        onChange={this.handleSelectChange}
                    >
                        {/* adding an empty <optgroup> is a fix for older IOS devices <= version 10.2 which had problems with multiselects */}
                        <optgroup disabled hidden />
                        {!multi &&
                            clearable && (
                                <option key={"–"} value={""}>
                                    {"–"}
                                </option>
                            )}
                        {(selectOptions as (HydratedSelectOption | HydratedSelectOptionGroup)[]).map((opt) => {
                            if ("options" in opt) {
                                return (
                                    <optgroup key={opt.label} label={opt.label}>
                                        {opt.options.map((e) => {
                                            return (
                                                <option key={e.value} value={e.value}>
                                                    {e.label}
                                                </option>
                                            )
                                        })}
                                    </optgroup>
                                )
                            } else {
                                return (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                )
                            }
                        })}
                    </select>
                </Input>
            )
        } else {
            return (
                <ElementType className={className} {...rest}>
                    <ReactSelectPlus.default
                        arrowRenderer={SelectArrowRenderer}
                        clearRenderer={SelectClearRenderer}
                        className={cx(
                            { [prefix("select-is-basic")]: basic },
                            { [prefix("select-is-error")]: !!error },
                            { [prefix("select-has-query")]: this.state.query && this.state.query.length > 0 }
                        )}
                        onChange={this.handleChange}
                        disabled={disabled}
                        clearable={clearable}
                        searchable={!!searchable || !!multi}
                        options={selectOptions}
                        value={value}
                        multi={multi}
                        placeholder={selectPlaceholder}
                        autosize={false}
                        removeSelected={false}
                        noResultsText={noResultsLabel || ""}
                        closeOnSelect={!multi}
                        optionRenderer={multi ? CheckboxOptionRenderer : undefined}
                        onSelectResetsInput={!multi}
                        onCloseResetsInput={true}
                        joinValues={true}
                        onInputChange={this.handleInputChange}
                        filterOptions={filterOptions}
                    >
                        {!basic && <span className={prefix("Select-label")}>{selectPlaceholder}</span>}
                    </ReactSelectPlus.default>
                </ElementType>
            )
        }
    }
}
