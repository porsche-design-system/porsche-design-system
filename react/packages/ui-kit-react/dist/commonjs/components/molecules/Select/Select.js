Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var ReactSelectPlus = require("../../../frameworks/react-select-plus-1.1.0");
var index_1 = require("../../../index");
var lib_1 = require("../../../lib");
var SelectArrowRenderer_1 = require("./SelectArrowRenderer");
var CheckboxOptionRenderer_1 = require("./CheckboxOptionRenderer");
var _meta = {
    name: "Select",
    type: lib_1.META.TYPES.MOLECULE
};
/**
 * A select compononent to select single or multiple values.
 * It switches between a custom, searchable dropdown on desktop browsers and a native selection on touch supported devices.
 * @see Checkbox
 * @see TextArea
 * @see Input
 */
var Select = /** @class */ (function (_super) {
    tslib_1.__extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            query: ""
        };
        _this.handleChange = function (value) {
            if (!_this.props.onChange) {
                return;
            }
            if (_this.props.disabled) {
                return;
            }
            if (Array.isArray(value)) {
                _this.props.onChange(value.map(function (option) { return option.value; }), _this.props);
            }
            else {
                _this.props.onChange(value.value, _this.props);
            }
        };
        _this.handleInputChange = function (value) {
            if (_this.props.disabled) {
                return;
            }
            if (typeof value !== "string") {
                return;
            }
            if (_this.props.onSearchChanged) {
                _this.props.onSearchChanged(value.length <= 0 ? null : value);
            }
            _this.setState({
                query: value || ""
            });
        };
        _this.handleSelectChange = function (e) {
            if (!_this.props.onChange) {
                return;
            }
            if (_this.props.disabled) {
                return;
            }
            if (!_this.props.multi) {
                _this.props.onChange(e.currentTarget.value, _this.props);
            }
            else {
                var values = e.target.options.slice().filter(function (o) { return o.selected; }).map(function (o) { return o.value; });
                _this.props.onChange(values, _this.props);
            }
        };
        /**
         * Check if an option is selected or not.
         * @param option The option to check.
         * @param value The selected values.
         * @returns Bool if the option is selected or not.
         */
        _this.isOptionSelected = function (option, value) {
            if (!value) {
                return false;
            }
            else if (!Array.isArray(value)) {
                return option.value.toString() === value.toString();
            }
            else {
                return value.includes(option.value.toString());
            }
        };
        /**
         * We need to tell the checkboxOptionRenderer which options got selected.
         * We do this by comparing the values of the options and value prop.
         * @param options The options of the select
         * @param value The selected values.
         * @returns Hydrated options, that include if they are selected or not.
         */
        _this.hydrateOptions = function (options, value) {
            if (!options) {
                return [];
            }
            var results = [];
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var option = options_1[_i];
                if ("options" in option) {
                    var optionGroup = option; // TODO: Remove with Typescript 2.7
                    var element = {
                        label: option.label,
                        options: optionGroup.options.map(function (e) {
                            return {
                                value: e.value,
                                label: e.label,
                                selected: value ? _this.isOptionSelected(e, value) : false
                            };
                        })
                    };
                    results.push(element);
                }
                else {
                    var optionValue = option; // TODO: Remove with Typescript 2.7
                    var element = {
                        value: optionValue.value,
                        label: optionValue.label,
                        selected: value ? _this.isOptionSelected(optionValue, value) : false
                    };
                    results.push(element);
                }
            }
            return results;
        };
        /**
         * Flattens a list of options or option groups to a flat list of options.
         */
        _this.getFlatOptionsList = function (options) {
            var list = [];
            for (var _i = 0, options_2 = options; _i < options_2.length; _i++) {
                var option = options_2[_i];
                if ("options" in option) {
                    var optionGroup = option; // TODO: Remove with Typescript 2.7
                    optionGroup.options.map(function (option) { list.push(option); });
                }
                else {
                    var optionValue = option; // TODO: Remove with Typescript 2.7
                    list.push(optionValue);
                }
            }
            return list;
        };
        /**
         * Retunrs the SelectValue or SelectValue[] from hydrated options or option groups.
         * @param options The hydrated select options or option groups.
         * @param multi Wether multi select is enabled.
         * @returns The selected value or an array of selected values, compatible with <select> value typing.
         */
        _this.getSelectedValues = function (options, multi) {
            if (options.length < 1) {
                return multi ? [] : "";
            }
            return _this.getSelectedValuesFromOptions(_this.getFlatOptionsList(options), multi);
        };
        /**
         * Returns the SelectValue or SelectValue[] from hydrated options.
         * @param options The hydrated select options.
         * @param multi Wether multi select is enabled.
         * @returns The selected value or an array of selected values
         */
        _this.getSelectedValuesFromOptions = function (options, multi) {
            if (!_this.props.value) {
                return multi ? [] : "";
            }
            var result = options.filter(function (e) { return e.selected; }).map(function (e) { return "" + e.value; });
            if (!multi && result.length === 0) {
                return multi ? [] : "";
            }
            else if (!multi && result.length === 1) {
                return result[0];
            }
            else {
                return result;
            }
        };
        /**
         * Combines all labels of the selected options to a comma separated string.
         * @param options The hydrated select options or option groups.
         * @returns Comma separated string of all selected values.
         */
        _this.createCombinedLabelString = function (options) {
            if (!options) {
                return "";
            }
            var labels = [];
            for (var _i = 0, options_3 = options; _i < options_3.length; _i++) {
                var option = options_3[_i];
                if ("options" in option) {
                    var optionGroup = option; // TODO: Remove with Typescript 2.7
                    optionGroup.options.filter(function (option) { return option.selected; }).map(function (option) { labels.push(option.label); });
                }
                else {
                    var optionValue = option; // TODO: Remove with Typescript 2.7
                    if (optionValue.selected) {
                        labels.push(option.label);
                    }
                }
            }
            return labels.join(", ");
        };
        /**
         * Ok, so this is a hacky method to get the multi select to work.
         * Basically to enable "text-overflow: ellipsis" we need to put all the comma separated labels
         * of the selected options as label of the first option.
         * If only one option is selected, we don't need to do anything.
         */
        _this.flattenValueLabelsIfNeeded = function (options) {
            var flatOptions = _this.getFlatOptionsList(options).filter(function (option) { return option.selected; });
            if (flatOptions.length <= 0) {
                return undefined;
            }
            if (flatOptions.length === 1) {
                return flatOptions[0];
            }
            var combinedLabels = _this.createCombinedLabelString(flatOptions);
            return flatOptions.map(function (e, i) {
                return {
                    value: e.value,
                    label: i === 0 ? combinedLabels : "",
                    selected: e.selected
                };
            });
        };
        /** User Agent detection for android and iOS. */
        _this.isMobile = function () {
            var userAgent = navigator.userAgent || navigator.vendor;
            var w = window;
            if (/android/i.test(userAgent)) {
                return true;
            }
            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !w.MSStream) {
                return true;
            }
            return false;
        };
        _this.bindSelect = function (input) { _this.selectInput = input; };
        _this.focusSelect = function () {
            _this.selectInput.focus();
        };
        return _this;
    }
    Select.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, disabled = _a.disabled, error = _a.error, multi = _a.multi, noResultsLabel = _a.noResultsLabel, onChange = _a.onChange, options = _a.options, placeholder = _a.placeholder, searchable = _a.searchable, value = _a.value, onSearchChanged = _a.onSearchChanged, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes", "disabled", "error", "multi", "noResultsLabel", "onChange", "options", "placeholder", "searchable", "value", "onSearchChanged"]);
        var selectOptions = this.hydrateOptions(options, value);
        if (this.isMobile()) {
            return (React.createElement(index_1.Input, tslib_1.__assign({ className: className, basic: true, value: this.createCombinedLabelString(selectOptions), placeholder: placeholder || "Select…", icon: "arrow_down_hair", error: !!error, customAttributes: tslib_1.__assign({}, customAttributes, { onFocus: this.focusSelect, onTouchEnd: this.focusSelect, readOnly: true }) }, rest),
                React.createElement("select", { className: lib_1.prefix("mobile-select"), value: this.getSelectedValues(selectOptions, !!multi), multiple: multi, ref: this.bindSelect, onChange: this.handleSelectChange }, selectOptions.map(function (o) {
                    if ("options" in o) {
                        var optionGroup = o; // TODO: Remove with Typescript 2.7
                        return (React.createElement("optgroup", { key: o.label, label: o.label }, optionGroup.options.map(function (e) {
                            return React.createElement("option", { key: e.value, value: e.value }, e.label);
                        })));
                    }
                    else {
                        var optionValue = o; // TODO: Remove with Typescript 2.7
                        return React.createElement("option", { key: optionValue.value, value: optionValue.value }, o.label);
                    }
                }))));
        }
        else {
            var selectValue = this.flattenValueLabelsIfNeeded(selectOptions);
            return (React.createElement(ReactSelectPlus.default, tslib_1.__assign({ arrowRenderer: SelectArrowRenderer_1.SelectArrowRenderer, className: classnames_1.default(className, (_b = {}, _b[lib_1.prefix("select-is-error")] = !!error, _b), (_c = {}, _c[lib_1.prefix("select-has-query")] = this.state.query && this.state.query.length > 0, _c)), onChange: this.handleChange, disabled: disabled, clearable: false, searchable: !!multi || !!searchable, options: selectOptions, value: selectValue, multi: multi, placeholder: placeholder, autosize: false, removeSelected: false, noResultsText: noResultsLabel || "", closeOnSelect: !multi, optionRenderer: (multi ? CheckboxOptionRenderer_1.CheckboxOptionRenderer : undefined), onSelectResetsInput: !multi, onCloseResetsInput: true, joinValues: true, onInputChange: this.handleInputChange }, customAttributes, rest)));
        }
        var _b, _c;
    };
    Select.defaultProps = {
        searchable: true
    };
    Select._meta = _meta;
    return Select;
}(React.PureComponent));
exports.Select = Select;
//# sourceMappingURL=Select.js.map