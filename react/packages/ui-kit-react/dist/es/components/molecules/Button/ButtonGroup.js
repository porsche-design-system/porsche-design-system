import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, prefix } from "../../../lib";
import { Flex } from "../../../index";
var _meta = {
    name: "ButtonGroup",
    parent: "Button",
    type: META.TYPES.MOLECULE
};
var _ButtonGroup = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var classes = cx(prefix("button-group"), className);
    return (React.createElement(Flex, tslib_1.__assign({ as: as, className: classes }, customAttributes, rest), children));
};
_ButtonGroup._meta = _meta;
/**
 * A button group wrapper for the default button.
 */
export var ButtonGroup = _ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map