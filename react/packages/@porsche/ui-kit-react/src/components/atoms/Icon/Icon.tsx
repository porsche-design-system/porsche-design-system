import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

const iconNames: IconName[] = [
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

export type IconName =
    | "111_points_check"
    | "4WD"
    | "accident_free"
    | "arrow_both_ways_hair"
    | "arrow_down_hair"
    | "arrow_left_hair_first"
    | "arrow_left_hair"
    | "arrow_open_full_down"
    | "arrow_open_full_up"
    | "arrow_right_hair_last"
    | "arrow_right_hair"
    | "arrow_up_hair"
    | "arrow_up"
    | "bin"
    | "box"
    | "calendar"
    | "cancel"
    | "check"
    | "circle_check"
    | "circle_crossed_small"
    | "circle"
    | "clock_time"
    | "closed_eye"
    | "compare"
    | "copy"
    | "corporate_sales"
    | "customer_view"
    | "delete_entry"
    | "document"
    | "edit_outline"
    | "edit"
    | "electricity"
    | "export"
    | "eye"
    | "facebook"
    | "filter"
    | "fuel_outline"
    | "fuel"
    | "full_service_history"
    | "google"
    | "grid_view"
    | "help"
    | "information_outline"
    | "information"
    | "instagram"
    | "linkedin"
    | "list"
    | "loader"
    | "magnify_glass"
    | "maintenance"
    | "map_pin"
    | "menu_dots_vertical"
    | "menu_dots"
    | "message_outline_request"
    | "message_outline"
    | "message"
    | "minus"
    | "mute"
    | "navigation"
    | "option_close"
    | "option_open"
    | "option_sort"
    | "option_view_1"
    | "organizer"
    | "overrevs_checked"
    | "overview"
    | "painting_checked"
    | "pause"
    | "person_add"
    | "person_outline"
    | "person"
    | "phone_receiver"
    | "picture_import"
    | "picture"
    | "pinterest"
    | "play_circle"
    | "play"
    | "plus"
    | "porsche_assistance"
    | "porsche_genuine_parts"
    | "print"
    | "profile_depth_3_mm"
    | "purchased"
    | "radio-button"
    | "readout"
    | "recondition_costs"
    | "rental_car"
    | "reset"
    | "restart"
    | "saved"
    | "share"
    | "smoking_forbidden"
    | "smoking"
    | "snapchat"
    | "star_outline"
    | "star"
    | "stock_view"
    | "sub_menu"
    | "timer"
    | "transmission"
    | "twitter"
    | "update_save"
    | "vehicle_reconditioned"
    | "warning_circle"
    | "warning_filled"
    | "wechat"
    | "whatsapp"
    | "youtube"

export type IconColorType =
    | "black"
    | "grey-darker"
    | "grey-dark"
    | "grey"
    | "grey-light"
    | "grey-lighter"
    | "white"
    | "red-1"
    | "red-2"
    | "blue-1"
    | "blue-2"
    | "status-green"
    | "status-yellow"
    | "status-orange"
    | "status-red"

export type IconSize = "small" | "regular" | "medium" | "large" | "huge"

export interface Icon extends React.StatelessComponent<IconProps> {
    names: IconName[]
}

export interface IconProps extends ClassNameProp, ComponentProp {
    /** The icon that should be used. */
    name: IconName

    /**
     * The size of the icon.
     * @default regular
     */
    size?: IconSize

    /**
     * The style of the color.
     * @default black
     */
    color?: IconColorType

    /**
     * Puts a circle around the icon
     */
    circled?: boolean

    /**
     * Adds a native HTML tooltip to the icon
     */
    title?: string
}

const defaultProps: Partial<IconProps> = {
    size: "regular"
}

const _Icon: React.StatelessComponent<IconProps> & Partial<Icon> = (props) => {
    const { as, className, children, name, color, circled, size, ...rest } = props

    const ElementType = getElementType(as, "i")

    const classNames = cx(
        prefix("icon"),
        prefix(`icon--${name}`),
        prefix(`icon--${size}`),
        { [`-${prefix(`text-color-${color}`)}`]: color },
        { [prefix("icon--circled")]: circled },
        className
    )

    return (
        <ElementType className={classNames} {...rest}>
            {children}
        </ElementType>
    )
}

_Icon.defaultProps = defaultProps

_Icon.names = iconNames

/**
 * Display an Icon from the Porsche icon font at various sizes.
 */
export const Icon = _Icon as Icon
