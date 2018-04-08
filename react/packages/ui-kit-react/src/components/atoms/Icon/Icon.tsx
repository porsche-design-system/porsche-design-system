import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"

const iconNames: IconName[] = [
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
]

export type IconName = "4WD" | "111_points_check" | "accident_free" | "arrow_both_ways_hair" | "arrow_down_hair" | "arrow_open_full_down" |
"arrow_open_full_up" | "arrow_left_hair" | "arrow_right_hair" | "arrow_left_hair_first" | "arrow_up_hair" | "arrow_up" |
"loader" | "bin" | "box" | "calendar" | "cancel" | "check" | "circle_check" | "circle_crossed_small" | "circle" |
"clock_time" | "closed_eye" | "compare" | "copy" | "delete_entry" | "edit_outline" | "edit" | "export" | "eye" | "facebook" |
"filter" | "fuel_outline" | "fuel" | "full_service_history" | "google" | "help" | "information_outline" | "information" |
"linkedin" | "list" | "magnify_glass" | "map_pin" | "menu_dots_vertical" | "menu_dots" | "message_outline" | "message" |
"minus" | "mute" | "navigation" | "electricity" | "arrow_right_hair_last" | "document" | "person_add" |
"message_outline_request" | "option_close" | "option_open" | "option_sort" | "option_view_1" | "organizer" |
"overrevs_checked" | "overview" | "painting_checked" | "person_outline" | "person" | "phone_receiver" |
"picture_import" | "picture" | "pause" | "pinterest" | "play_circle" | "play" | "plus" | "porsche_assistance" |
"porsche_genuine_parts" | "print" | "profile_depth_3_mm" | "radio-button" | "readout" | "reset" | "restart" | "saved" |
"share" | "smoking_forbidden" | "smoking" | "star_outline" | "star" | "sub_menu" | "timer" | "transmission" | "twitter" |
"update_save" | "warning_circle" | "warning_filled" | "wechat" | "whatsapp"

export interface Icon extends React.StatelessComponent<IconProps> {
    names: IconName[]
}

export interface IconProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /** The icon that should be used. */
    name: IconName

    /**
     * The size of the icon.
     * @default small
     */
    size?: "small" | "medium" | "large"
}

const defaultProps: Partial<IconProps> = {
    size: "small"
}

const _meta: ComponentMeta = {
    name: "Icon",
    type: META.TYPES.ATOM
}

const _Icon: React.StatelessComponent<IconProps> & Partial<Icon> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        name,
        size,
        ...rest
    } = props

    const ElementType = getElementType(as, "i")

    const classNames = cx(
        prefix("icon"),
        prefix(`icon--${name}`),
        prefix(`icon--${size}`),
        className
    )

    return <ElementType className={classNames} {...customAttributes} {...rest}/>
}

_Icon.defaultProps = defaultProps

_Icon.names = iconNames

_Icon._meta = _meta

/**
 * Display an Icon from the Porsche icon font at various sizes.
 */
export const Icon = _Icon as Icon
