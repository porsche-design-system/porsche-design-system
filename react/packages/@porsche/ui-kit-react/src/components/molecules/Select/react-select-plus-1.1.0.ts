// This whole thing is copied from https://github.com/HubSpot/react-select-plus/commit/b707f634717b9fcf16392937035c8a0c67e57c7e
// It is very customized though, unnecessary code is removed, bugs fixed, behaviour changed...
// Since this is less than optimal, we should probably rewrite the select from scratch, potentially after a redesign

/* tslint:disable */

import * as React from "react"
import { findDOMNode } from "react-dom"
import classNames from "classnames"
import { prefix } from "../../../lib"

function arrowRenderer(_ref: any) {
    let onMouseDown = _ref.onMouseDown

    return React.createElement("span", {
        className: prefix("Select-arrow"),
        onMouseDown: onMouseDown
    })
}

let map: any = [
    {
        base: "A",
        letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
    },
    {
        base: "AA",
        letters: /[\uA732]/g
    },
    { base: "AE", letters: /[\u00C6\u01FC\u01E2]/g },
    { base: "AO", letters: /[\uA734]/g },
    { base: "AU", letters: /[\uA736]/g },
    { base: "AV", letters: /[\uA738\uA73A]/g },
    { base: "AY", letters: /[\uA73C]/g },
    {
        base: "B",
        letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
    },
    { base: "C", letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
    { base: "D", letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
    { base: "DZ", letters: /[\u01F1\u01C4]/g },
    {
        base: "Dz",
        letters: /[\u01F2\u01C5]/g
    },
    {
        base: "E",
        letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
    },
    {
        base: "F",
        letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
    },
    {
        base: "G",
        letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
    },
    { base: "H", letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
    {
        base: "I",
        letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
    },
    { base: "J", letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
    { base: "K", letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
    {
        base: "L",
        letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
    },
    { base: "LJ", letters: /[\u01C7]/g },
    { base: "Lj", letters: /[\u01C8]/g },
    { base: "M", letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
    {
        base: "N",
        letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
    },
    { base: "NJ", letters: /[\u01CA]/g },
    { base: "Nj", letters: /[\u01CB]/g },
    {
        base: "O",
        letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
    },
    { base: "OI", letters: /[\u01A2]/g },
    { base: "OO", letters: /[\uA74E]/g },
    { base: "OU", letters: /[\u0222]/g },
    { base: "P", letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
    {
        base: "Q",
        letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
    },
    {
        base: "R",
        letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
    },
    {
        base: "S",
        letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
    },
    {
        base: "T",
        letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
    },
    { base: "TZ", letters: /[\uA728]/g },
    {
        base: "U",
        letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
    },
    {
        base: "V",
        letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
    },
    { base: "VY", letters: /[\uA760]/g },
    { base: "W", letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
    { base: "X", letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
    {
        base: "Y",
        letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
    },
    { base: "Z", letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
    {
        base: "a",
        letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
    },
    { base: "aa", letters: /[\uA733]/g },
    { base: "ae", letters: /[\u00E6\u01FD\u01E3]/g },
    { base: "ao", letters: /[\uA735]/g },
    { base: "au", letters: /[\uA737]/g },
    { base: "av", letters: /[\uA739\uA73B]/g },
    { base: "ay", letters: /[\uA73D]/g },
    {
        base: "b",
        letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
    },
    { base: "c", letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
    { base: "d", letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
    { base: "dz", letters: /[\u01F3\u01C6]/g },
    {
        base: "e",
        letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
    },
    { base: "f", letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
    {
        base: "g",
        letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
    },
    {
        base: "h",
        letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
    },
    { base: "hv", letters: /[\u0195]/g },
    {
        base: "i",
        letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
    },
    { base: "j", letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
    {
        base: "k",
        letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
    },
    {
        base: "l",
        letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
    },
    { base: "lj", letters: /[\u01C9]/g },
    { base: "m", letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
    {
        base: "n",
        letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
    },
    { base: "nj", letters: /[\u01CC]/g },
    {
        base: "o",
        letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
    },
    { base: "oi", letters: /[\u01A3]/g },
    { base: "ou", letters: /[\u0223]/g },
    { base: "oo", letters: /[\uA74F]/g },
    { base: "p", letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
    {
        base: "q",
        letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
    },
    {
        base: "r",
        letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
    },
    {
        base: "s",
        letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
    },
    {
        base: "t",
        letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
    },
    { base: "tz", letters: /[\uA729]/g },
    {
        base: "u",
        letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
    },
    {
        base: "v",
        letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
    },
    { base: "vy", letters: /[\uA761]/g },
    { base: "w", letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
    { base: "x", letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
    {
        base: "y",
        letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
    },
    { base: "z", letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
]

function stripDiacritics(str: any) {
    for (let i = 0; i < map.length; i++) {
        str = str.replace(map[i].letters, map[i].base)
    }
    return str
}

function trim(str: any) {
    return str.replace(/^\s+|\s+$/g, "")
}

function filterOptions(this: any, options: any, filterValue: any, excludeOptions: any, props: any) {
    let _this: any = this

    if (props.ignoreAccents) {
        filterValue = stripDiacritics(filterValue)
    }

    if (props.ignoreCase) {
        filterValue = filterValue.toLowerCase()
    }

    if (props.trimFilter) {
        filterValue = trim(filterValue)
    }

    if (excludeOptions) {
        excludeOptions = excludeOptions.map(function(i: any) {
            return i[props.valueKey]
        })
    }

    return options.filter(function(option: any) {
        if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) {
            return false
        }
        if (props.filterOption) {
            return props.filterOption.call(_this, option, filterValue)
        }
        if (!filterValue) {
            return true
        }
        let valueTest = option[props.valueKey].toString()
        let labelTest = option[props.labelKey].toString()

        if (props.ignoreAccents) {
            if (props.matchProp !== "label") {
                valueTest = stripDiacritics(valueTest)
            }
            if (props.matchProp !== "value") {
                labelTest = stripDiacritics(labelTest)
            }
        }

        if (props.ignoreCase) {
            if (props.matchProp !== "label") {
                valueTest = valueTest.toLowerCase()
            }
            if (props.matchProp !== "value") {
                labelTest = labelTest.toLowerCase()
            }
        }

        return props.matchPos === "start"
            ? (props.matchProp !== "label" && valueTest.substr(0, filterValue.length) === filterValue) ||
                  (props.matchProp !== "value" && labelTest.substr(0, filterValue.length) === filterValue)
            : (props.matchProp !== "label" && valueTest.indexOf(filterValue) >= 0) ||
                  (props.matchProp !== "value" && labelTest.indexOf(filterValue) >= 0)
    })
}

function isGroup$1(option: any) {
    return option && Array.isArray(option.options)
}

function menuRenderer(this: any, _ref: any) {
    let focusedOption = _ref.focusedOption,
        focusOption = _ref.focusOption,
        inputValue = _ref.inputValue,
        instancePrefix = _ref.instancePrefix,
        labelKey = _ref.labelKey,
        onFocus = _ref.onFocus,
        onOptionRef = _ref.onOptionRef,
        onSelect = _ref.onSelect,
        optionClassName = _ref.optionClassName,
        optionComponent = _ref.optionComponent,
        optionGroupComponent = _ref.optionGroupComponent,
        optionRenderer = _ref.optionRenderer,
        options = _ref.options,
        removeValue = _ref.removeValue,
        selectValue = _ref.selectValue,
        valueArray = _ref.valueArray,
        valueKey = _ref.valueKey

    let OptionGroup = optionGroupComponent
    let Option = optionComponent
    let renderLabel = optionRenderer || this.getOptionLabel

    let renderOptions = function renderOptions(optionsSubset: any) {
        return optionsSubset.map(function(option: any, i: any) {
            if (isGroup$1(option)) {
                let optionGroupClass = classNames({
                    [prefix("Select-option-group")]: true
                })

                return React.createElement(
                    OptionGroup,
                    {
                        className: optionGroupClass,
                        key: "option-group-" + i,
                        label: renderLabel(option),
                        option: option,
                        optionIndex: i
                    },
                    renderOptions(option.options)
                )
            } else {
                let isSelected = valueArray && valueArray.indexOf(option) > -1
                let isFocused = option === focusedOption
                let optionClass = classNames(optionClassName, {
                    [prefix("Select-option")]: true,
                    [prefix("select-is-selected")]: isSelected,
                    [prefix("select-is-focused")]: isFocused,
                    [prefix("select-is-disabled")]: option.disabled
                })

                return React.createElement(
                    Option,
                    {
                        className: optionClass,
                        focusOption: focusOption,
                        inputValue: inputValue,
                        instancePrefix: instancePrefix,
                        isDisabled: option.disabled,
                        isFocused: isFocused,
                        isSelected: isSelected,
                        key: "option-" + i + "-" + option[valueKey],
                        onFocus: onFocus,
                        onSelect: onSelect,
                        option: option,
                        optionIndex: i,
                        ref: function ref(_ref2) {
                            onOptionRef(_ref2, isFocused)
                        },
                        removeValue: removeValue,
                        selectValue: selectValue
                    },
                    renderLabel(option, i)
                )
            }
        })
    }

    return renderOptions(options)
}

function clearRenderer() {
    return React.createElement("span", {
        className: prefix("Select-clear"),
        dangerouslySetInnerHTML: { __html: "&times;" }
    })
}

let _typeof =
    typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function(obj: any) {
              return typeof obj
          }
        : function(obj: any) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                  ? "symbol"
                  : typeof obj
          }

let asyncGenerator = (function() {
    function AwaitValue(this: any, value: any) {
        this.value = value
    }

    function AsyncGenerator(this: any, gen: any) {
        let front: any, back: any

        function send(key: any, arg: any) {
            return new Promise(function(resolve, reject) {
                let request = {
                    key: key,
                    arg: arg,
                    resolve: resolve,
                    reject: reject,
                    next: null
                }

                if (back) {
                    back = back.next = request
                } else {
                    front = back = request
                    resume(key, arg)
                }
            })
        }

        function resume(key: any, arg: any) {
            try {
                let result = gen[key](arg)
                let value = result.value

                if (value instanceof AwaitValue) {
                    Promise.resolve((value as any).value).then(
                        function(arg) {
                            resume("next", arg)
                        },
                        function(arg) {
                            resume("throw", arg)
                        }
                    )
                } else {
                    settle(result.done ? "return" : "normal", result.value)
                }
            } catch (err) {
                settle("throw", err)
            }
        }

        function settle(type: any, value: any) {
            switch (type) {
                case "return":
                    front.resolve({
                        value: value,
                        done: true
                    })
                    break

                case "throw":
                    front.reject(value)
                    break

                default:
                    front.resolve({
                        value: value,
                        done: false
                    })
                    break
            }

            front = front.next

            if (front) {
                resume(front.key, front.arg)
            } else {
                back = null
            }
        }

        this._invoke = send

        if (typeof gen.return !== "function") {
            this.return = undefined
        }
    }

    if (typeof Symbol === "function" && (Symbol as any).asyncIterator) {
        AsyncGenerator.prototype[(Symbol as any).asyncIterator] = function() {
            return this
        }
    }

    AsyncGenerator.prototype.next = function(arg: any) {
        return this._invoke("next", arg)
    }

    AsyncGenerator.prototype.throw = function(arg: any) {
        return this._invoke("throw", arg)
    }

    AsyncGenerator.prototype.return = function(arg: any) {
        return this._invoke("return", arg)
    }

    return {
        wrap: function(fn: any): any {
            return function(this: any): any {
                return new (<any>AsyncGenerator(fn.apply(this, arguments)))()
            }
        },
        await: function(value: any): any {
            return new (<any>AwaitValue(value))()
        }
    }
})()

let classCallCheck = function(instance: any, Constructor: any) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

let createClass: any = (function() {
    function defineProperties(target: any, props: any) {
        for (let i = 0; i < props.length; i++) {
            let descriptor = props[i]
            descriptor.enumerable = descriptor.enumerable || false
            descriptor.configurable = true
            if ("value" in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }

    return function(Constructor: any, protoProps: any, staticProps: any) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps)
        if (staticProps) defineProperties(Constructor, staticProps)
        return Constructor
    }
})()

let defineProperty = function(obj: any, key: any, value: any) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }

    return obj
}

let _extends =
    Object.assign ||
    function(target: any) {
        for (let i = 1; i < arguments.length; i++) {
            let source = arguments[i]

            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }

        return target
    }

let inherits = function(subClass: any, superClass: any) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    })
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass)
}

let objectWithoutProperties = function(obj: any, keys: any) {
    let target: any = {}

    for (let i in obj) {
        if (keys.indexOf(i) >= 0) continue
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
        target[i] = obj[i]
    }

    return target
}

let possibleConstructorReturn = function(self: any, call: any) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self
}

let Dropdown = (function(_React$Component) {
    inherits(Dropdown, _React$Component)

    function Dropdown(this: any): any {
        classCallCheck(this, Dropdown)
        return possibleConstructorReturn(
            this,
            ((Dropdown as any).__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments)
        )
    }

    createClass(Dropdown, [
        {
            key: "render",
            value: function render(this: any): any {
                // This component adds no markup
                return this.props.children
            }
        }
    ])
    return Dropdown
})(React.Component)

let Option = (function(_React$Component) {
    inherits(Option, _React$Component)

    function Option(this: any, props: any) {
        classCallCheck(this, Option)

        let _this = possibleConstructorReturn(
            this,
            ((Option as any).__proto__ || Object.getPrototypeOf(Option)).call(this, props)
        )

        _this.handleMouseDown = _this.handleMouseDown.bind(_this)
        _this.handleMouseEnter = _this.handleMouseEnter.bind(_this)
        _this.handleMouseMove = _this.handleMouseMove.bind(_this)
        _this.handleTouchStart = _this.handleTouchStart.bind(_this)
        _this.handleTouchEnd = _this.handleTouchEnd.bind(_this)
        _this.handleTouchMove = _this.handleTouchMove.bind(_this)
        _this.onFocus = _this.onFocus.bind(_this)
        return _this
    }

    createClass(Option, [
        {
            key: "blockEvent",
            value: function blockEvent(event: any) {
                event.preventDefault()
                event.stopPropagation()
                if (event.target.tagName !== "A" || !("href" in event.target)) {
                    return
                }
                if (event.target.target) {
                    window.open(event.target.href, event.target.target)
                } else {
                    window.location.href = event.target.href
                }
            }
        },
        {
            key: "handleMouseDown",
            value: function handleMouseDown(this: any, event: any) {
                event.preventDefault()
                event.stopPropagation()
                this.props.onSelect(this.props.option, event)
            }
        },
        {
            key: "handleMouseEnter",
            value: function handleMouseEnter(this: any, event: any) {
                this.onFocus(event)
            }
        },
        {
            key: "handleMouseMove",
            value: function handleMouseMove(this: any, event: any) {
                this.onFocus(event)
            }
        },
        {
            key: "handleTouchEnd",
            value: function handleTouchEnd(this: any, event: any) {
                // Check if the view is being dragged, In this case
                // we don't want to fire the click event (because the user only wants to scroll)
                if (this.dragging) return

                this.handleMouseDown(event)
            }
        },
        {
            key: "handleTouchMove",
            value: function handleTouchMove(this: any, event: any) {
                // Set a flag that the view is being dragged
                this.dragging = true
            }
        },
        {
            key: "handleTouchStart",
            value: function handleTouchStart(this: any, event: any) {
                // Set a flag that the view is not being dragged
                this.dragging = false
            }
        },
        {
            key: "onFocus",
            value: function onFocus(this: any, event: any) {
                if (!this.props.isFocused) {
                    this.props.onFocus(this.props.option, event)
                }
            }
        },
        {
            key: "render",
            value: function render(this: any): any {
                let _props = this.props,
                    option = _props.option,
                    instancePrefix = _props.instancePrefix,
                    optionIndex = _props.optionIndex

                let className = classNames(this.props.className, option.className)

                return option.disabled
                    ? React.createElement(
                          "div",
                          {
                              className: className,
                              onMouseDown: this.blockEvent,
                              onClick: this.blockEvent
                          },
                          this.props.children
                      )
                    : React.createElement(
                          "div",
                          {
                              className: className,
                              style: option.style,
                              role: "option",
                              "aria-label": option.label,
                              onMouseDown: this.handleMouseDown,
                              onMouseEnter: this.handleMouseEnter,
                              onMouseMove: this.handleMouseMove,
                              onTouchStart: this.handleTouchStart,
                              onTouchMove: this.handleTouchMove,
                              onTouchEnd: this.handleTouchEnd,
                              id: instancePrefix + "-option-" + optionIndex,
                              title: option.title
                          },
                          this.props.children
                      )
            }
        }
    ])
    return Option
})(React.Component)

let OptionGroup = (function(_React$Component) {
    inherits(OptionGroup, _React$Component)

    function OptionGroup(this: any): any {
        classCallCheck(this, OptionGroup)
        return possibleConstructorReturn(
            this,
            ((OptionGroup as any).__proto__ || Object.getPrototypeOf(OptionGroup)).apply(this, arguments)
        )
    }

    createClass(OptionGroup, [
        {
            key: "blockEvent",
            value: function blockEvent(event: any) {
                event.preventDefault()
                event.stopPropagation()
                if (event.target.tagName !== "A" || !("href" in event.target)) {
                    return
                }
                if (event.target.target) {
                    window.open(event.target.href, event.target.target)
                } else {
                    window.location.href = event.target.href
                }
            }
        },
        {
            key: "handleMouseDown",
            value: function handleMouseDown(event: any) {
                event.preventDefault()
                event.stopPropagation()
            }
        },
        {
            key: "handleTouchEnd",
            value: function handleTouchEnd(this: any, event: any) {
                // Check if the view is being dragged, In this case
                // we don't want to fire the click event (because the user only wants to scroll)
                if (this.dragging) return

                this.handleMouseDown(event)
            }
        },
        {
            key: "handleTouchMove",
            value: function handleTouchMove(this: any, event: any) {
                // Set a flag that the view is being dragged
                this.dragging = true
            }
        },
        {
            key: "handleTouchStart",
            value: function handleTouchStart(this: any, event: any) {
                // Set a flag that the view is not being dragged
                this.dragging = false
            }
        },
        {
            key: "render",
            value: function render(this: any): any {
                let option = this.props.option

                let className = classNames(this.props.className, option.className)

                return option.disabled
                    ? React.createElement(
                          "div",
                          {
                              className: className,
                              onMouseDown: this.blockEvent,
                              onClick: this.blockEvent
                          },
                          this.props.children
                      )
                    : React.createElement(
                          "div",
                          {
                              className: className,
                              style: option.style,
                              onMouseDown: this.handleMouseDown,
                              onMouseEnter: this.handleMouseEnter,
                              onMouseMove: this.handleMouseMove,
                              onTouchStart: this.handleTouchStart,
                              onTouchMove: this.handleTouchMove,
                              onTouchEnd: this.handleTouchEnd,
                              title: option.title
                          },
                          React.createElement(
                              "div",
                              { className: prefix("Select-option-group-label") },
                              this.props.label
                          ),
                          this.props.children
                      )
            }
        }
    ])
    return OptionGroup
})(React.Component)

let Value = (function(_React$Component) {
    inherits(Value, _React$Component)

    function Value(this: any, props: any) {
        classCallCheck(this, Value)

        let _this = possibleConstructorReturn(
            this,
            ((Value as any).__proto__ || Object.getPrototypeOf(Value)).call(this, props)
        )

        return _this
    }

    createClass(Value, [
        {
            key: "renderLabel",
            value: function renderLabel(this: any): any {
                let className = prefix("Select-value-label")
                return React.createElement(
                    "span",
                    { className: className, role: "option", "aria-selected": "true", id: this.props.id },
                    this.props.value
                )
            }
        },
        {
            key: "render",
            value: function render(this: any): any {
                return React.createElement(
                    "div",
                    {
                        className: classNames(prefix("Select-value"))
                    },
                    this.renderLabel()
                )
            }
        }
    ])
    return Value
})(React.Component)

/*!
	Copyright (c) 2017 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/react-select
*/
function clone(obj: any) {
    let copy: any = {}
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr]
        }
    }
    return copy
}

function isGroup(option: any) {
    return option && Array.isArray(option.options)
}

let stringifyValue = function stringifyValue(value: any) {
    return typeof value === "string" ? value : (value !== null && JSON.stringify(value)) || ""
}

let instanceId = 1

let Select$1: any = (function(_React$Component) {
    inherits(Select, _React$Component)

    function Select(this: any, props: any) {
        classCallCheck(this, Select)

        let _this = possibleConstructorReturn(
            this,
            ((Select as any).__proto__ || Object.getPrototypeOf(Select)).call(this, props)
        )
        ;[
            "clearValue",
            "focusOption",
            "handleInputBlur",
            "handleInputChange",
            "handleInputFocus",
            "handleInputValueChange",
            "handleKeyDown",
            "handleMenuScroll",
            "handleMouseDown",
            "handleMouseDownOnArrow",
            "handleMouseDownOnMenu",
            "handleRequired",
            "handleTouchOutside",
            "handleTouchMove",
            "handleTouchStart",
            "handleTouchEnd",
            "handleTouchEndClearValue",
            "handleValueClick",
            "getOptionLabel",
            "onOptionRef",
            "removeValue",
            "selectValue"
        ].forEach(function(fn) {
            return (_this[fn] = _this[fn].bind(_this))
        })

        _this.state = {
            inputValue: "",
            isFocused: false,
            isOpen: false,
            isPseudoFocused: false,
            required: false
        }
        return _this
    }

    createClass(Select, [
        {
            key: "componentWillMount",
            value: function componentWillMount(this: any) {
                this._flatOptions = this.flattenOptions(this.props.options)
                this._instancePrefix = "react-select-" + (this.props.instanceId || ++instanceId) + "-"
                let valueArray = this.getValueArray(this.props.value)

                if (this.props.required) {
                    this.setState({
                        required: this.handleRequired(valueArray[0], this.props.multi)
                    })
                }
            }
        },
        {
            key: "componentDidMount",
            value: function componentDidMount(this: any) {
                if (typeof this.props.autofocus !== "undefined" && typeof console !== "undefined") {
                    console.warn(
                        "Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0"
                    )
                }
                if (this.props.autoFocus || this.props.autofocus) {
                    this.focus()
                }
            }
        },
        {
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(this: any, nextProps: any) {
                if (nextProps.options !== this.props.options) {
                    this._flatOptions = this.flattenOptions(nextProps.options)
                }

                let valueArray = this.getValueArray(nextProps.value, nextProps)

                if (!nextProps.isOpen && this.props.isOpen) {
                    this.closeMenu()
                } else if (nextProps.isOpen && !this.props.isOpen) {
                    this.setState({ isOpen: true })
                }

                if (nextProps.required) {
                    this.setState({
                        required: this.handleRequired(valueArray[0], nextProps.multi)
                    })
                } else if (this.props.required) {
                    // Used to be required but it's not any more
                    this.setState({ required: false })
                }
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate(this: any, prevProps: any, prevState: any) {
                // focus to the selected option
                if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
                    let focusedOptionNode: any = findDOMNode(this.focused)
                    let menuNode: any = findDOMNode(this.menu)

                    let scrollTop = menuNode.scrollTop
                    let scrollBottom = scrollTop + menuNode.offsetHeight
                    let optionTop = focusedOptionNode.offsetTop
                    let optionBottom = optionTop + focusedOptionNode.offsetHeight

                    if (scrollTop > optionTop || scrollBottom < optionBottom) {
                        menuNode.scrollTop = focusedOptionNode.offsetTop
                    }

                    // We still set hasScrolledToOption to true even if we didn't
                    // actually need to scroll, as we've still confirmed that the
                    // option is in view.
                    this.hasScrolledToOption = true
                } else if (!this.state.isOpen) {
                    this.hasScrolledToOption = false
                }

                if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
                    this._scrollToFocusedOptionOnUpdate = false
                    let focusedDOM: any = findDOMNode(this.focused)
                    let menuDOM: any = findDOMNode(this.menu)
                    let focusedRect = focusedDOM.getBoundingClientRect()
                    let menuRect = menuDOM.getBoundingClientRect()
                    if (focusedRect.bottom > menuRect.bottom) {
                        menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight
                    } else if (focusedRect.top < menuRect.top) {
                        menuDOM.scrollTop = focusedDOM.offsetTop
                    }
                }
                if (this.props.scrollMenuIntoView && this.menuContainer) {
                    let menuContainerRect = this.menuContainer.getBoundingClientRect()
                    if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
                        window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight)
                    }
                }
                if (prevProps.disabled !== this.props.disabled) {
                    this.setState({ isFocused: false }) // eslint-disable-line react/no-did-update-set-state
                    this.closeMenu()
                }
                if (prevState.isOpen !== this.state.isOpen) {
                    this.toggleTouchOutsideEvent(this.state.isOpen)
                    let handler = this.state.isOpen ? this.props.onOpen : this.props.onClose
                    handler && handler()
                }
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount(this: any) {
                this.toggleTouchOutsideEvent(false)
            }
        },
        {
            key: "toggleTouchOutsideEvent",
            value: function toggleTouchOutsideEvent(this: any, enabled: any) {
                if (enabled) {
                    if (!document.addEventListener && (document as any).attachEvent) {
                        ;(document as any).attachEvent("ontouchstart", this.handleTouchOutside)
                    } else {
                        document.addEventListener("touchstart", this.handleTouchOutside)
                    }
                } else {
                    if (!document.removeEventListener && (document as any).detachEvent) {
                        ;(document as any).detachEvent("ontouchstart", this.handleTouchOutside)
                    } else {
                        document.removeEventListener("touchstart", this.handleTouchOutside)
                    }
                }
            }
        },
        {
            key: "handleTouchOutside",
            value: function handleTouchOutside(this: any, event: any) {
                // handle touch outside on ios to dismiss menu
                if (this.wrapper && !this.wrapper.contains(event.target)) {
                    this.closeMenu()
                }
            }
        },
        {
            key: "focus",
            value: function focus(this: any) {
                if (!this.input) return
                this.input.focus()
            }
        },
        {
            key: "blurInput",
            value: function blurInput(this: any) {
                if (!this.input) return
                this.input.blur()
            }
        },
        {
            key: "handleTouchMove",
            value: function handleTouchMove(this: any, event: any) {
                // Set a flag that the view is being dragged
                this.dragging = true
            }
        },
        {
            key: "handleTouchStart",
            value: function handleTouchStart(this: any, event: any) {
                // Set a flag that the view is not being dragged
                this.dragging = false
            }
        },
        {
            key: "handleTouchEnd",
            value: function handleTouchEnd(this: any, event: any) {
                // Check if the view is being dragged, In this case
                // we don't want to fire the click event (because the user only wants to scroll)
                if (this.dragging) return

                // Fire the mouse events
                this.handleMouseDown(event)
            }
        },
        {
            key: "handleTouchEndClearValue",
            value: function handleTouchEndClearValue(this: any, event: any) {
                // Check if the view is being dragged, In this case
                // we don't want to fire the click event (because the user only wants to scroll)
                if (this.dragging) return

                // Clear the value
                this.clearValue(event)
            }
        },
        {
            key: "handleMouseDown",
            value: function handleMouseDown(this: any, event: any) {
                // if the event was triggered by a mousedown and not the primary
                // button, or if the component is disabled, ignore it.
                if (this.props.disabled || (event.type === "mousedown" && event.button !== 0)) {
                    return
                }

                if (event.target.tagName === "INPUT") {
                    if (!this.state.isFocused) {
                        this._openAfterFocus = this.props.openOnClick
                        this.focus()
                    } else if (!this.state.isOpen) {
                        this.setState({
                            isOpen: true,
                            isPseudoFocused: false
                        })
                    }
                    return
                }

                // prevent default event handlers
                event.preventDefault()

                // for the non-searchable select, toggle the menu
                if (!this.props.searchable) {
                    // TODO: This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
                    this.focus()
                    return this.setState({
                        isOpen: !this.state.isOpen
                    })
                }

                if (this.state.isFocused) {
                    // On iOS, we can get into a state where we think the input is focused but it isn't really,
                    // since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
                    // Call focus() again here to be safe.
                    this.focus()

                    let input = this.input

                    // clears the value so that the cursor will be at the end of input when the component re-renders
                    input.value = ""

                    // if the input is focused, ensure the menu is open
                    this.setState({
                        isOpen: true,
                        isPseudoFocused: false
                    })
                } else {
                    // otherwise, focus the input and open the menu
                    this._openAfterFocus = this.props.openOnClick
                    this.focus()
                }
            }
        },
        {
            key: "handleMouseDownOnArrow",
            value: function handleMouseDownOnArrow(this: any, event: any) {
                // if the event was triggered by a mousedown and not the primary
                // button, or if the component is disabled, ignore it.
                if (this.props.disabled || (event.type === "mousedown" && event.button !== 0)) {
                    return
                }
                // If the menu isn't open, let the event bubble to the main handleMouseDown
                if (this.state.isOpen) {
                    // prevent default event handlers
                    event.stopPropagation()
                    event.preventDefault()
                    // close the menu
                    this.closeMenu()
                } else {
                    this.setState({
                        isOpen: true
                    })
                }
            }
        },
        {
            key: "handleMouseDownOnMenu",
            value: function handleMouseDownOnMenu(this: any, event: any) {
                // if the event was triggered by a mousedown and not the primary
                // button, or if the component is disabled, ignore it.
                if (this.props.disabled || (event.type === "mousedown" && event.button !== 0)) {
                    return
                }
                event.stopPropagation()
                event.preventDefault()

                this._openAfterFocus = true
                this.focus()
            }
        },
        {
            key: "closeMenu",
            value: function closeMenu(this: any) {
                if (this.props.onCloseResetsInput) {
                    this.setState({
                        isOpen: false,
                        isPseudoFocused: this.state.isFocused,
                        inputValue: this.handleInputValueChange("")
                    })
                } else {
                    this.setState({
                        isOpen: false,
                        isPseudoFocused: this.state.isFocused
                    })
                }
                this.hasScrolledToOption = false
            }
        },
        {
            key: "handleInputFocus",
            value: function handleInputFocus(this: any, event: any) {
                if (this.props.disabled) return
                let isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus
                if (this.props.onFocus) {
                    this.props.onFocus(event)
                }
                this.setState({
                    isFocused: true,
                    isOpen: isOpen
                })
                this._openAfterFocus = false
            }
        },
        {
            key: "handleInputBlur",
            value: function handleInputBlur(this: any, event: any) {
                // The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
                if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
                    this.focus()
                    return
                }

                if (this.props.onBlur) {
                    this.props.onBlur(event)
                }
                let onBlurredState = {
                    isFocused: false,
                    isOpen: false,
                    isPseudoFocused: false
                }
                if (this.props.onBlurResetsInput) {
                    ;(onBlurredState as any).inputValue = this.handleInputValueChange("")
                }
                this.setState(onBlurredState)
            }
        },
        {
            key: "handleInputChange",
            value: function handleInputChange(this: any, event: any) {
                let newInputValue = event.target.value

                if (this.state.inputValue !== event.target.value) {
                    newInputValue = this.handleInputValueChange(newInputValue)
                }

                this.setState({
                    isOpen: true,
                    isPseudoFocused: false,
                    inputValue: newInputValue
                })
            }
        },
        {
            key: "handleInputValueChange",
            value: function handleInputValueChange(this: any, newValue: any) {
                if (this.props.onInputChange) {
                    let nextState = this.props.onInputChange(newValue)
                    // Note: != used deliberately here to catch undefined and null
                    if (
                        nextState != null &&
                        (typeof nextState === "undefined" ? "undefined" : _typeof(nextState)) !== "object"
                    ) {
                        newValue = "" + nextState
                    }
                }
                return newValue
            }
        },
        {
            key: "handleKeyDown",
            value: function handleKeyDown(this: any, event: any) {
                if (this.props.disabled) return

                if (typeof this.props.onInputKeyDown === "function") {
                    this.props.onInputKeyDown(event)
                    if (event.defaultPrevented) {
                        return
                    }
                }

                switch (event.keyCode) {
                    case 9:
                        // tab
                        if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
                            return
                        }
                        event.preventDefault()
                        this.selectFocusedOption()
                        return
                    case 13:
                        // enter
                        event.preventDefault()
                        event.stopPropagation()
                        if (this.state.isOpen) {
                            this.selectFocusedOption()
                        } else {
                            this.focusNextOption()
                        }
                        return
                    case 27:
                        // escape
                        if (this.state.isOpen) {
                            this.closeMenu()
                            event.stopPropagation()
                        } else if (this.props.clearable && this.props.escapeClearsValue) {
                            this.clearValue(event)
                            event.stopPropagation()
                        }
                        break
                    case 32:
                        // space
                        if (this.props.searchable) {
                            return
                        }
                        event.preventDefault()
                        if (!this.state.isOpen) {
                            this.focusNextOption()
                            return
                        }
                        event.stopPropagation()
                        this.selectFocusedOption()
                        break
                    case 38:
                        // up
                        this.focusPreviousOption()
                        break
                    case 40:
                        // down
                        this.focusNextOption()
                        break
                    case 33:
                        // page up
                        this.focusPageUpOption()
                        break
                    case 34:
                        // page down
                        this.focusPageDownOption()
                        break
                    case 35:
                        // end key
                        if (event.shiftKey) {
                            return
                        }
                        this.focusEndOption()
                        break
                    case 36:
                        // home key
                        if (event.shiftKey) {
                            return
                        }
                        this.focusStartOption()
                        break
                    default:
                        return
                }
                event.preventDefault()
            }
        },
        {
            key: "handleValueClick",
            value: function handleValueClick(this: any, option: any, event: any) {
                if (!this.props.onValueClick) return
                this.props.onValueClick(option, event)
            }
        },
        {
            key: "handleMenuScroll",
            value: function handleMenuScroll(this: any, event: any) {
                if (!this.props.onMenuScrollToBottom) return
                let target = event.target

                if (
                    target.scrollHeight > target.offsetHeight &&
                    target.scrollHeight - target.offsetHeight - target.scrollTop <= 0
                ) {
                    this.props.onMenuScrollToBottom()
                }
            }
        },
        {
            key: "handleRequired",
            value: function handleRequired(value: any, multi: any) {
                if (!value) return true
                return multi ? value.length === 0 : Object.keys(value).length === 0
            }
        },
        {
            key: "getOptionLabel",
            value: function getOptionLabel(this: any, op: any) {
                return op[this.props.labelKey]
            }

            /**
             * Turns a value into an array from the given options
             * @param    {String|Number|Array}    value        - the value of the select input
             * @param    {Object}        nextProps    - optionally specify the nextProps so the returned array uses the latest configuration
             * @returns    {Array}    the value of the select represented in an array
             */
        },
        {
            key: "getValueArray",
            value: function getValueArray(this: any, value: any, nextProps: any) {
                let _this2 = this

                /** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
                let props =
                    (typeof nextProps === "undefined" ? "undefined" : _typeof(nextProps)) === "object"
                        ? nextProps
                        : this.props
                if (props.multi) {
                    if (typeof value === "string") {
                        value = value.split(props.delimiter)
                    }
                    if (!Array.isArray(value)) {
                        if (value === null || value === undefined) return []
                        value = [value]
                    }
                    return value
                        .map(function(value: any) {
                            return _this2.expandValue(value, props)
                        })
                        .filter(function(i: any) {
                            return i
                        })
                }
                let expandedValue = this.expandValue(value, props)
                return expandedValue ? [expandedValue] : []
            }

            /**
             * Retrieve a value from the given options and valueKey
             * @param    {String|Number|Array}    value    - the selected value(s)
             * @param    {Object}        props    - the Select component's props (or nextProps)
             */
        },
        {
            key: "expandValue",
            value: function expandValue(this: any, value: any, props: any) {
                let valueType = typeof value === "undefined" ? "undefined" : _typeof(value)
                if (valueType !== "string" && valueType !== "number" && valueType !== "boolean") return value
                let labelKey = props.labelKey,
                    renderInvalidValues = props.renderInvalidValues,
                    valueKey = props.valueKey

                let options = this._flatOptions
                if (!options || value === "") return
                for (let i = 0; i < options.length; i++) {
                    if (String(options[i][valueKey]) === String(value)) return options[i]
                }

                // no matching option, return an invalid option if renderInvalidValues is enabled
                if (renderInvalidValues) {
                    let _ref

                    this._invalidOptions = this._invalidOptions || {}
                    this._invalidOptions[value] =
                        this._invalidOptions[value] ||
                        ((_ref = {
                            invalid: true
                        }),
                        defineProperty(_ref, labelKey, value),
                        defineProperty(_ref, valueKey, value),
                        _ref)
                    return this._invalidOptions[value]
                }
            }
        },
        {
            key: "setValue",
            value: function setValue(this: any, value: any) {
                let _this3 = this

                if (this.props.autoBlur) {
                    this.blurInput()
                }
                if (this.props.required) {
                    let required = this.handleRequired(value, this.props.multi)
                    this.setState({ required: required })
                }
                if (this.props.onChange) {
                    if (this.props.simpleValue && value) {
                        value = this.props.multi
                            ? value
                                  .map(function(i: any) {
                                      return i[_this3.props.valueKey]
                                  })
                                  .join(this.props.delimiter)
                            : value[this.props.valueKey]
                    }
                    this.props.onChange(value)
                }
            }
        },
        {
            key: "selectValue",
            value: function selectValue(this: any, value: any) {
                let _this4 = this

                // NOTE: we actually add/set the value in a callback to make sure the
                // input value is empty to avoid styling issues in Chrome
                if (this.props.closeOnSelect) {
                    this.hasScrolledToOption = false
                }
                if (this.props.multi) {
                    let updatedValue = this.props.onSelectResetsInput ? "" : this.state.inputValue
                    this.setState(
                        {
                            focusedIndex: null,
                            inputValue: this.handleInputValueChange(updatedValue),
                            isOpen: !this.props.closeOnSelect
                        },
                        function() {
                            let valueArray = _this4.getValueArray(_this4.props.value)
                            if (
                                valueArray.some(function(i: any) {
                                    return i[_this4.props.valueKey] === value[_this4.props.valueKey]
                                })
                            ) {
                                _this4.removeValue(value)
                            } else {
                                _this4.addValue(value)
                            }
                        }
                    )
                } else {
                    this.setState(
                        {
                            inputValue: this.handleInputValueChange(""),
                            isOpen: !this.props.closeOnSelect,
                            isPseudoFocused: this.state.isFocused
                        },
                        function() {
                            _this4.setValue(value)
                        }
                    )
                }
            }
        },
        {
            key: "addValue",
            value: function addValue(this: any, value: any) {
                let valueArray = this.getValueArray(this.props.value)
                let visibleOptions = this._visibleOptions.filter(function(val: any) {
                    return !val.disabled
                })
                let lastValueIndex = visibleOptions.indexOf(value)
                this.setValue(valueArray.concat(value))
                if (visibleOptions.length - 1 === lastValueIndex) {
                    // the last option was selected; focus the second-last one
                    this.focusOption(visibleOptions[lastValueIndex - 1])
                } else if (visibleOptions.length > lastValueIndex) {
                    // focus the option below the selected one
                    this.focusOption(visibleOptions[lastValueIndex + 1])
                }
            }
        },
        {
            key: "popValue",
            value: function popValue(this: any) {
                let valueArray = this.getValueArray(this.props.value)
                if (!valueArray.length) return
                if (valueArray[valueArray.length - 1].clearableValue === false) return
                this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null)
            }
        },
        {
            key: "removeValue",
            value: function removeValue(this: any, value: any) {
                let _this5 = this

                let valueArray = this.getValueArray(this.props.value)
                this.setValue(
                    valueArray.filter(function(i: any) {
                        return i[_this5.props.valueKey] !== value[_this5.props.valueKey]
                    })
                )
                this.focus()
            }
        },
        {
            key: "clearValue",
            value: function clearValue(this: any, event: any) {
                // if the event was triggered by a mousedown and not the primary
                // button, ignore it.
                if (event && event.type === "mousedown" && event.button !== 0) {
                    return
                }
                event.preventDefault()
                event.stopPropagation()
                this.setValue(this.getResetValue())
                this.setState({
                    isOpen: false,
                    inputValue: this.handleInputValueChange("")
                })
            }
        },
        {
            key: "getResetValue",
            value: function getResetValue(this: any) {
                if (this.props.resetValue !== undefined) {
                    return this.props.resetValue
                } else if (this.props.multi) {
                    return []
                } else {
                    return null
                }
            }
        },
        {
            key: "focusOption",
            value: function focusOption(this: any, option: any) {
                this.setState({
                    focusedOption: option
                })
            }
        },
        {
            key: "focusNextOption",
            value: function focusNextOption(this: any) {
                this.focusAdjacentOption("next")
            }
        },
        {
            key: "focusPreviousOption",
            value: function focusPreviousOption(this: any) {
                this.focusAdjacentOption("previous")
            }
        },
        {
            key: "focusPageUpOption",
            value: function focusPageUpOption(this: any) {
                this.focusAdjacentOption("page_up")
            }
        },
        {
            key: "focusPageDownOption",
            value: function focusPageDownOption(this: any) {
                this.focusAdjacentOption("page_down")
            }
        },
        {
            key: "focusStartOption",
            value: function focusStartOption(this: any) {
                this.focusAdjacentOption("start")
            }
        },
        {
            key: "focusEndOption",
            value: function focusEndOption(this: any) {
                this.focusAdjacentOption("end")
            }
        },
        {
            key: "focusAdjacentOption",
            value: function focusAdjacentOption(this: any, dir: any) {
                let options = this._visibleOptions
                    .map(function(option: any, index: any) {
                        return { option: option, index: index }
                    })
                    .filter(function(option: any) {
                        return !option.option.disabled
                    })
                this._scrollToFocusedOptionOnUpdate = true
                if (!this.state.isOpen) {
                    this.setState({
                        isOpen: true,
                        inputValue: "",
                        focusedOption:
                            this._focusedOption ||
                            (options.length ? options[dir === "next" ? 0 : options.length - 1].option : null)
                    })
                    return
                }
                if (!options.length) return
                let focusedIndex = -1
                for (let i = 0; i < options.length; i++) {
                    if (this._focusedOption === options[i].option) {
                        focusedIndex = i
                        break
                    }
                }
                if (dir === "next" && focusedIndex !== -1) {
                    focusedIndex = (focusedIndex + 1) % options.length
                } else if (dir === "previous") {
                    if (focusedIndex > 0) {
                        focusedIndex = focusedIndex - 1
                    } else {
                        focusedIndex = options.length - 1
                    }
                } else if (dir === "start") {
                    focusedIndex = 0
                } else if (dir === "end") {
                    focusedIndex = options.length - 1
                } else if (dir === "page_up") {
                    let potentialIndex = focusedIndex - this.props.pageSize
                    if (potentialIndex < 0) {
                        focusedIndex = 0
                    } else {
                        focusedIndex = potentialIndex
                    }
                } else if (dir === "page_down") {
                    let potentialIndex = focusedIndex + this.props.pageSize
                    if (potentialIndex > options.length - 1) {
                        focusedIndex = options.length - 1
                    } else {
                        focusedIndex = potentialIndex
                    }
                }

                if (focusedIndex === -1) {
                    focusedIndex = 0
                }

                this.setState({
                    focusedIndex: options[focusedIndex].index,
                    focusedOption: options[focusedIndex].option
                })
            }
        },
        {
            key: "getFocusedOption",
            value: function getFocusedOption(this: any) {
                return this._focusedOption
            }
        },
        {
            key: "selectFocusedOption",
            value: function selectFocusedOption(this: any) {
                if (this._focusedOption) {
                    return this.selectValue(this._focusedOption)
                }
            }
        },
        {
            key: "renderLoading",
            value: function renderLoading(this: any) {
                if (!this.props.isLoading) return
                return React.createElement(
                    "span",
                    { className: prefix("Select-loading-zone"), "aria-hidden": "true" },
                    React.createElement("span", { className: prefix("Select-loading") })
                )
            }
        },
        {
            key: "renderValue",
            value: function renderValue(this: any, valueArray: any, isOpen: any) {
                let _this6 = this

                let renderLabel = this.props.valueRenderer || this.getOptionLabel
                let ValueComponent = this.props.valueComponent
                if (!valueArray.length) {
                    return !this.state.inputValue
                        ? React.createElement(
                              "div",
                              { className: prefix("Select-placeholder") },
                              this.props.placeholder
                          )
                        : null
                }

                if (!this.state.inputValue) {
                    const joinedLabel = valueArray.map((v: any) => v.label).join(", ")
                    return React.createElement(
                        ValueComponent,
                        {
                            id: this._instancePrefix + "-value-item",
                            disabled: this.props.disabled,
                            instancePrefix: this._instancePrefix,
                            value: joinedLabel
                        },
                        renderLabel(joinedLabel)
                    )
                }

                return null
            }
        },
        {
            key: "renderInput",
            value: function renderInput(this: any, valueArray: any, focusedOptionIndex: any) {
                let _classNames,
                    _this7 = this

                let className = classNames(prefix("Select-input"), this.props.inputProps.className)
                let isOpen = !!this.state.isOpen

                let ariaOwns = classNames(
                    ((_classNames = {}),
                    defineProperty(_classNames, this._instancePrefix + "-list", isOpen),
                    defineProperty(
                        _classNames,
                        this._instancePrefix + "-backspace-remove-message",
                        this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue
                    ),
                    _classNames)
                )
                let inputProps = _extends({}, this.props.inputProps, {
                    role: "combobox",
                    "aria-expanded": "" + isOpen,
                    "aria-owns": ariaOwns,
                    "aria-haspopup": "" + isOpen,
                    "aria-activedescendant": isOpen
                        ? this._instancePrefix + "-option-" + focusedOptionIndex
                        : this._instancePrefix + "-value",
                    "aria-describedby": this.props["aria-describedby"],
                    "aria-labelledby": this.props["aria-labelledby"],
                    "aria-label": this.props["aria-label"],
                    className: className,
                    tabIndex: this.props.tabIndex,
                    onBlur: this.handleInputBlur,
                    onChange: this.handleInputChange,
                    onFocus: this.handleInputFocus,
                    ref: function ref(_ref2: any) {
                        return (_this7.input = _ref2)
                    },
                    required: this.state.required,
                    value: this.state.inputValue
                })

                if (this.props.inputRenderer) {
                    return this.props.inputRenderer(inputProps)
                }

                if (this.props.disabled || !this.props.searchable) {
                    let _props$inputProps = this.props.inputProps,
                        inputClassName = _props$inputProps.inputClassName,
                        divProps = objectWithoutProperties(_props$inputProps, ["inputClassName"])

                    let _ariaOwns = classNames(defineProperty({}, this._instancePrefix + "-list", isOpen))
                    return React.createElement(
                        "div",
                        _extends({}, divProps, {
                            role: "combobox",
                            "aria-expanded": isOpen,
                            "aria-owns": _ariaOwns,
                            "aria-activedescendant": isOpen
                                ? this._instancePrefix + "-option-" + focusedOptionIndex
                                : this._instancePrefix + "-value",
                            "aria-labelledby": this.props["aria-labelledby"],
                            "aria-label": this.props["aria-label"],
                            className: className,
                            tabIndex: this.props.tabIndex || 0,
                            onBlur: this.handleInputBlur,
                            onFocus: this.handleInputFocus,
                            ref: function ref(_ref3: any) {
                                return (_this7.input = _ref3)
                            },
                            "aria-disabled": "" + !!this.props.disabled,
                            style: { border: 0, width: 1, display: "inline-block" }
                        })
                    )
                }

                return React.createElement(
                    "div",
                    { className: className, key: "input-wrap" },
                    React.createElement("input", _extends({ id: this.props.id }, inputProps))
                )
            }
        },
        {
            key: "renderClear",
            value: function renderClear(this: any) {
                let valueArray = this.getValueArray(this.props.value)
                if (!this.props.clearable || !valueArray.length || this.props.disabled || this.props.isLoading) {
                    return
                }
                let clear = this.props.clearRenderer()

                return React.createElement(
                    "span",
                    {
                        className: prefix("Select-clear-zone"),
                        title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
                        "aria-label": this.props.multi ? this.props.clearAllText : this.props.clearValueText,
                        onMouseDown: this.clearValue,
                        onTouchStart: this.handleTouchStart,
                        onTouchMove: this.handleTouchMove,
                        onTouchEnd: this.handleTouchEndClearValue
                    },
                    clear
                )
            }
        },
        {
            key: "renderArrow",
            value: function renderArrow(this: any) {
                if (!this.props.arrowRenderer) {
                    return
                }

                let onMouseDown = this.handleMouseDownOnArrow
                let isOpen = this.state.isOpen
                let arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen })

                if (!arrow) {
                    return null
                }

                return React.createElement(
                    "span",
                    {
                        className: prefix("Select-arrow-zone"),
                        onMouseDown: onMouseDown
                    },
                    arrow
                )
            }
        },
        {
            key: "filterFlatOptions",
            value: function filterFlatOptions(this: any, excludeOptions: any) {
                let filterValue = this.state.inputValue
                let flatOptions = this._flatOptions
                if (this.props.filterOptions) {
                    // Maintain backwards compatibility with boolean attribute
                    let filterOptions$$1 =
                        typeof this.props.filterOptions === "function" ? this.props.filterOptions : filterOptions

                    return filterOptions$$1(flatOptions, filterValue, excludeOptions, {
                        filterOption: this.props.filterOption,
                        ignoreAccents: this.props.ignoreAccents,
                        ignoreCase: this.props.ignoreCase,
                        labelKey: this.props.labelKey,
                        matchPos: this.props.matchPos,
                        matchProp: this.props.matchProp,
                        valueKey: this.props.valueKey,
                        trimFilter: this.props.trimFilter
                    })
                } else {
                    return flatOptions
                }
            }
        },
        {
            key: "flattenOptions",
            value: function flattenOptions(this: any, options: any, group: any) {
                if (!options) {
                    return []
                }
                let flatOptions: any = []
                for (let i = 0; i < options.length; i++) {
                    // We clone each option with a pointer to its parent group for efficient unflattening
                    let optionCopy = clone(options[i])
                    if (group) {
                        optionCopy.group = group
                    }
                    if (isGroup(optionCopy)) {
                        flatOptions = flatOptions.concat(this.flattenOptions(optionCopy.options, optionCopy))
                        optionCopy.options = []
                    } else {
                        flatOptions.push(optionCopy)
                    }
                }
                return flatOptions
            }
        },
        {
            key: "unflattenOptions",
            value: function unflattenOptions(flatOptions: any) {
                let groupedOptions: any = []
                let parent: any = void 0,
                    child: any = void 0

                // Remove all ancestor groups from the tree
                flatOptions.forEach(function(option: any) {
                    option.isInTree = false
                    parent = option.group
                    while (parent) {
                        if (parent.isInTree) {
                            parent.options = []
                            parent.isInTree = false
                        }
                        parent = parent.group
                    }
                })

                // Now reconstruct the options tree
                flatOptions.forEach(function(option: any) {
                    child = option
                    parent = child.group
                    while (parent) {
                        if (!child.isInTree) {
                            parent.options.push(child)
                            child.isInTree = true
                        }

                        child = parent
                        parent = child.group
                    }
                    if (!child.isInTree) {
                        groupedOptions.push(child)
                        child.isInTree = true
                    }
                })

                // Remove the isInTree flag we added
                flatOptions.forEach(function(option: any) {
                    delete option.isInTree
                })

                return groupedOptions
            }
        },
        {
            key: "onOptionRef",
            value: function onOptionRef(this: any, ref: any, isFocused: any) {
                if (isFocused) {
                    this.focused = ref
                }
            }
        },
        {
            key: "renderMenu",
            value: function renderMenu(this: any, options: any, valueArray: any, focusedOption: any) {
                if (options && options.length) {
                    return this.props.menuRenderer({
                        focusedOption: focusedOption,
                        focusOption: this.focusOption,
                        inputValue: this.state.inputValue,
                        instancePrefix: this._instancePrefix,
                        labelKey: this.props.labelKey,
                        onFocus: this.focusOption,
                        onSelect: this.selectValue,
                        optionClassName: this.props.optionClassName,
                        optionComponent: this.props.optionComponent,
                        optionGroupComponent: this.props.optionGroupComponent,
                        optionRenderer: this.props.optionRenderer || this.getOptionLabel,
                        options: options,
                        selectValue: this.selectValue,
                        removeValue: this.removeValue,
                        valueArray: valueArray,
                        valueKey: this.props.valueKey,
                        onOptionRef: this.onOptionRef
                    })
                } else if (this.props.noResultsText) {
                    return React.createElement(
                        "div",
                        { className: prefix("Select-noresults") },
                        this.props.noResultsText
                    )
                } else {
                    return null
                }
            }
        },
        {
            key: "renderHiddenField",
            value: function renderHiddenField(this: any, valueArray: any) {
                let _this8 = this

                if (!this.props.name) {
                    return
                }
                if (this.props.joinValues) {
                    let value = valueArray
                        .map(function(i: any) {
                            return stringifyValue(i[_this8.props.valueKey])
                        })
                        .join(this.props.delimiter)
                    return React.createElement("input", {
                        type: "hidden",
                        ref: function ref(_ref4) {
                            return (_this8.value = _ref4)
                        },
                        name: this.props.name,
                        value: value,
                        disabled: this.props.disabled
                    })
                }
                return valueArray.map(function(item: any, index: any) {
                    return React.createElement("input", {
                        key: "hidden." + index,
                        type: "hidden",
                        ref: "value" + index,
                        name: _this8.props.name,
                        value: stringifyValue(item[_this8.props.valueKey]),
                        disabled: _this8.props.disabled
                    })
                })
            }
        },
        {
            key: "getFocusableOptionIndex",
            value: function getFocusableOptionIndex(this: any, selectedOption: any) {
                let options = this._visibleOptions
                if (!options.length) {
                    return null
                }

                let valueKey = this.props.valueKey
                let focusedOption = this.state.focusedOption || selectedOption
                if (focusedOption && !focusedOption.disabled) {
                    let focusedOptionIndex = -1
                    options.some(function(option: any, index: any) {
                        let isOptionEqual = option[valueKey] === focusedOption[valueKey]
                        if (isOptionEqual) {
                            focusedOptionIndex = index
                        }
                        return isOptionEqual
                    })
                    if (focusedOptionIndex !== -1) {
                        return focusedOptionIndex
                    }
                }

                for (let i = 0; i < options.length; i++) {
                    if (!options[i].disabled) {
                        return i
                    }
                }
                return null
            }
        },
        {
            key: "renderOuter",
            value: function renderOuter(this: any, options: any, valueArray: any, focusedOption: any) {
                let _this9 = this

                let Dropdown$$1 = this.props.dropdownComponent
                let menu = this.renderMenu(options, valueArray, focusedOption)
                if (!menu) {
                    return null
                }

                return React.createElement(
                    Dropdown$$1,
                    null,
                    React.createElement(
                        "div",
                        {
                            ref: function ref(_ref6) {
                                return (_this9.menuContainer = _ref6)
                            },
                            className: prefix("Select-menu-outer"),
                            style: this.props.menuContainerStyle
                        },
                        React.createElement(
                            "div",
                            {
                                ref: function ref(_ref5) {
                                    return (_this9.menu = _ref5)
                                },
                                role: "listbox",
                                tabIndex: -1,
                                className: prefix("Select-menu"),
                                id: this._instancePrefix + "-list",
                                style: this.props.menuStyle,
                                onScroll: this.handleMenuScroll,
                                onMouseDown: this.handleMouseDownOnMenu
                            },
                            menu
                        )
                    )
                )
            }
        },
        {
            key: "render",
            value: function render(this: any) {
                let _this10 = this

                let valueArray = this.getValueArray(this.props.value)
                this._visibleOptions = this.filterFlatOptions(
                    this.props.multi && this.props.removeSelected ? valueArray : null
                )
                let options = this.unflattenOptions(this._visibleOptions)
                let isOpen = typeof this.props.isOpen === "boolean" ? this.props.isOpen : this.state.isOpen
                if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) {
                    isOpen = false
                }
                let focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0])

                let focusedOption = null
                if (focusedOptionIndex !== null) {
                    focusedOption = this._focusedOption = this._visibleOptions[focusedOptionIndex]
                } else {
                    focusedOption = this._focusedOption = null
                }
                let className = classNames(prefix("Select"), this.props.className, {
                    [prefix("Select--multi")]: this.props.multi,
                    [prefix("Select--single")]: !this.props.multi,
                    [prefix("select-is-clearable")]: this.props.clearable,
                    [prefix("select-is-disabled")]: this.props.disabled,
                    [prefix("select-is-focused")]: this.state.isFocused,
                    [prefix("select-is-loading")]: this.props.isLoading,
                    [prefix("select-is-open")]: isOpen,
                    [prefix("select-is-pseudo-focused")]: this.state.isPseudoFocused,
                    [prefix("select-is-searchable")]: this.props.searchable,
                    [prefix("select-has-value")]: valueArray.length,
                    [prefix("Select--rtl")]: this.props.rtl
                })

                return React.createElement(
                    "div",
                    {
                        ref: function ref(_ref8) {
                            return (_this10.wrapper = _ref8)
                        },
                        className: className,
                        style: this.props.wrapperStyle
                    },
                    this.renderHiddenField(valueArray),
                    React.createElement(
                        "div",
                        {
                            ref: function ref(_ref7) {
                                return (_this10.control = _ref7)
                            },
                            className: prefix("Select-control"),
                            style: this.props.style,
                            onKeyDown: this.handleKeyDown,
                            onMouseDown: this.handleMouseDown,
                            onTouchEnd: this.handleTouchEnd,
                            onTouchStart: this.handleTouchStart,
                            onTouchMove: this.handleTouchMove
                        },
                        this.props.children,
                        this.renderValue(valueArray, isOpen),
                        this.renderInput(valueArray, focusedOptionIndex),
                        this.renderLoading(),
                        this.renderClear(),
                        this.renderArrow()
                    ),
                    isOpen ? this.renderOuter(options, valueArray, focusedOption) : null
                )
            }
        }
    ])
    return Select
})(React.Component)

Select$1.defaultProps = {
    arrowRenderer: arrowRenderer,
    clearable: true,
    clearAllText: "Clear all",
    clearRenderer: clearRenderer,
    clearValueText: "Clear value",
    closeOnSelect: true,
    delimiter: ",",
    disabled: false,
    dropdownComponent: Dropdown,
    escapeClearsValue: true,
    filterOptions: filterOptions,
    ignoreAccents: true,
    ignoreCase: true,
    inputProps: {},
    isLoading: false,
    joinValues: false,
    labelKey: "label",
    matchPos: "any",
    matchProp: "any",
    menuBuffer: 0,
    menuRenderer: menuRenderer,
    multi: false,
    noResultsText: "No results found",
    onBlurResetsInput: true,
    onSelectResetsInput: true,
    onCloseResetsInput: true,
    openOnClick: true,
    optionComponent: Option,
    optionGroupComponent: OptionGroup,
    pageSize: 5,
    placeholder: "Select…",
    removeSelected: true,
    required: false,
    rtl: false,
    scrollMenuIntoView: true,
    searchable: true,
    simpleValue: false,
    tabSelectsValue: true,
    trimFilter: true,
    valueComponent: Value,
    valueKey: "value"
}

function defaultChildren(props: any) {
    return React.createElement(Select$1, props)
}

function defaultChildren$2(props: any) {
    return React.createElement(Select$1, props)
}

function isOptionUnique(_ref3: any) {
    let option = _ref3.option,
        options = _ref3.options,
        labelKey = _ref3.labelKey,
        valueKey = _ref3.valueKey

    return (
        options.filter(function(existingOption: any) {
            return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey]
        }).length === 0
    )
}

function isValidNewOption(_ref4: any) {
    let label = _ref4.label

    return !!label
}

function newOptionCreator(_ref5: any) {
    let label = _ref5.label,
        labelKey = _ref5.labelKey,
        valueKey = _ref5.valueKey

    let option: any = {}
    option[valueKey] = label
    option[labelKey] = label
    option.className = prefix("Select-create-option-placeholder")
    return option
}

function promptTextCreator(label: any) {
    return 'Create option "' + label + '"'
}

function shouldKeyDownEventCreateNewOption(_ref6: any) {
    let keyCode = _ref6.keyCode

    switch (keyCode) {
        case 9: // TAB
        case 13: // ENTER
        case 188:
            // COMMA
            return true
        default:
            return false
    }
}

function defaultChildren$1(props: any) {
    return React.createElement(Select$1, props)
}

Select$1.Value = Value
Select$1.Option = Option

export default Select$1

/* tslint:enable */
