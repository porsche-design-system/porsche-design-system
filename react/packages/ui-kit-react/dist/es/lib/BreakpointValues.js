import * as tslib_1 from "tslib";
import { prefix } from "./prefix";
export function mapBreakpointPropToClasses(className, prop) {
    if (prop === undefined) {
        return {};
    }
    var classes = {};
    if (typeof prop === "number" || typeof prop === "string") {
        classes[prefix("" + className + prop)] = !!prop;
    }
    else {
        Object.keys(prop).forEach(function (key) {
            var value = prop[key];
            if (key === "base") {
                classes = tslib_1.__assign({}, classes, (_a = {}, _a[prefix("" + className + value)] = !!value, _a));
            }
            else {
                classes = tslib_1.__assign({}, classes, (_b = {}, _b[prefix("" + className + value + "-" + key)] = !!value, _b));
            }
            var _a, _b;
        });
    }
    return classes;
}
//# sourceMappingURL=BreakpointValues.js.map