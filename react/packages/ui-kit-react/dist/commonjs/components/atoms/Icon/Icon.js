Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var iconNames = [
    "4WD", "111_points_check", "accident_free", "arrow_both_ways_hair", "arrow_down_hair", "arrow_open_full_down",
    "arrow_open_full_up", "arrow_left_hair", "arrow_right_hair", "arrow_left_hair_first", "arrow_up_hair", "arrow_up",
    "loader", "bin", "box", "calendar", "cancel", "check", "circle_check", "circle_crossed_small", "circle",
    "clock_time", "closed_eye", "compare", "copy", "delete_entry", "edit_outline", "edit", "export", "eye", "facebook",
    "filter", "fuel_outline", "fuel", "full_service_history", "google", "help", "information_outline", "information",
    "linkedin", "list", "magnify_glass", "map_pin", "menu_dots_vertical", "menu_dots", "message_outline", "message",
    "minus", "mute", "navigation", "electricity", "arrow_right_hair_last", "document", "person_add",
    "message_outline_request", "option_close", "option_open", "option_sort", "option_view_1", "organizer",
    "overrevs_checked", "overview", "painting_checked", "person_outline", "person", "phone_receiver",
    "picture_import", "picture", "pause", "pinterest", "play_circle", "play", "plus", "porsche_assistance",
    "porsche_genuine_parts", "print", "profile_depth_3_mm", "radio-button", "readout", "reset", "restart", "saved",
    "share", "smoking_forbidden", "smoking", "star_outline", "star", "sub_menu", "timer", "transmission", "twitter",
    "update_save", "warning_circle", "warning_filled", "wechat", "whatsapp"
];
var defaultProps = {
    size: "small"
};
var _meta = {
    name: "Icon",
    type: lib_1.META.TYPES.ATOM
};
var _Icon = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, name = props.name, size = props.size, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "name", "size"]);
    var ElementType = lib_1.getElementType(as, "i");
    var classNames = classnames_1.default(lib_1.prefix("icon"), lib_1.prefix("icon--" + name), lib_1.prefix("icon--" + size), className);
    return React.createElement(ElementType, tslib_1.__assign({ className: classNames }, customAttributes, rest));
};
_Icon.defaultProps = defaultProps;
_Icon.names = iconNames;
_Icon._meta = _meta;
/**
 * Display an Icon from the Porsche icon font at various sizes.
 */
exports.Icon = _Icon;
//# sourceMappingURL=Icon.js.map