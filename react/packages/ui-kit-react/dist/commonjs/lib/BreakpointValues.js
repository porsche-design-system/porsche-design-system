Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prefix_1 = require("./prefix");
function mapBreakpointPropToClasses(className, prop) {
    if (prop === undefined) {
        return {};
    }
    var classes = {};
    if (typeof prop === "number" || typeof prop === "string") {
        classes[prefix_1.prefix("" + className + prop)] = !!prop;
    }
    else {
        Object.keys(prop).forEach(function (key) {
            var value = prop[key];
            if (key === "base") {
                classes = tslib_1.__assign({}, classes, (_a = {}, _a[prefix_1.prefix("" + className + value)] = !!value, _a));
            }
            else {
                classes = tslib_1.__assign({}, classes, (_b = {}, _b[prefix_1.prefix("" + className + value + "-" + key)] = !!value, _b));
            }
            var _a, _b;
        });
    }
    return classes;
}
exports.mapBreakpointPropToClasses = mapBreakpointPropToClasses;
//# sourceMappingURL=BreakpointValues.js.map