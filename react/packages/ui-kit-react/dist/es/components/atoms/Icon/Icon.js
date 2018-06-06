import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
var iconNames = [
    "111_points_check",
    "4WD",
    "accident_free",
    "arrow_both_ways_hair",
    "arrow_down_hair",
    "arrow_left_hair_first",
    "arrow_left_hair",
    "arrow_open_full_down",
    "arrow_open_full_up",
    "arrow_right_hair_last",
    "arrow_right_hair",
    "arrow_up_hair",
    "arrow_up",
    "bin",
    "box",
    "calendar",
    "cancel",
    "check",
    "circle_check",
    "circle_crossed_small",
    "circle",
    "clock_time",
    "closed_eye",
    "compare",
    "copy",
    "corporate_sales",
    "customer_view",
    "delete_entry",
    "document",
    "edit_outline",
    "edit",
    "electricity",
    "export",
    "eye",
    "facebook",
    "filter",
    "fuel_outline",
    "fuel",
    "full_service_history",
    "google",
    "grid_view",
    "help",
    "information_outline",
    "information",
    "instagram",
    "linkedin",
    "list",
    "loader",
    "magnify_glass",
    "maintenance",
    "map_pin",
    "menu_dots_vertical",
    "menu_dots",
    "message_outline_request",
    "message_outline",
    "message",
    "minus",
    "mute",
    "navigation",
    "option_close",
    "option_open",
    "option_sort",
    "option_view_1",
    "organizer",
    "overrevs_checked",
    "overview",
    "painting_checked",
    "pause",
    "person_add",
    "person_outline",
    "person",
    "phone_receiver",
    "picture_import",
    "picture",
    "pinterest",
    "play_circle",
    "play",
    "plus",
    "porsche_assistance",
    "porsche_genuine_parts",
    "print",
    "profile_depth_3_mm",
    "purchased",
    "radio-button",
    "readout",
    "recondition_costs",
    "rental_car",
    "reset",
    "restart",
    "saved",
    "share",
    "smoking_forbidden",
    "smoking",
    "snapchat",
    "star_outline",
    "star",
    "stock_view",
    "sub_menu",
    "timer",
    "transmission",
    "twitter",
    "update_save",
    "vehicle_reconditioned",
    "warning_circle",
    "warning_filled",
    "wechat",
    "whatsapp",
    "youtube"
]
var defaultProps = {
    size: "regular"
}
var _meta = {
    name: "Icon",
    type: META.TYPES.ATOM
}
var _Icon = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        name = props.name,
        color = props.color,
        circled = props.circled,
        size = props.size,
        rest = tslib_1.__rest(props, ["as", "className", "children", "name", "color", "circled", "size"])
    var ElementType = getElementType(as, "i")
    var classNames = cx(
        prefix("icon"),
        prefix("icon--" + name),
        prefix("icon--" + size),
        ((_a = {}), (_a["-" + prefix("text-color-" + color)] = color), _a),
        ((_b = {}), (_b[prefix("icon--circled")] = circled), _b),
        className
    )
    return React.createElement(ElementType, tslib_1.__assign({ className: classNames }, rest), children)
    var _a, _b
}
_Icon.defaultProps = defaultProps
_Icon.names = iconNames
_Icon._meta = _meta
/**
 * Display an Icon from the Porsche icon font at various sizes.
 */
export var Icon = _Icon
//# sourceMappingURL=Icon.js.map
