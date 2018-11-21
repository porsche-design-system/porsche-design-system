// Atoms
export { Breakpoint, BreakpointProps } from "./components/atoms/Breakpoint/Breakpoint"
export { Divider, DividerProps } from "./components/atoms/Divider/Divider"
export { Flex, FlexProps } from "./components/atoms/Flex/Flex"
export { FlexItem, FlexItemProps } from "./components/atoms/Flex/FlexItem"
export { Icon, IconProps } from "./components/atoms/Icon/Icon"
export { Logo, LogoProps } from "./components/atoms/Logo/Logo"
export { Spacing, SpacingProps } from "./components/atoms/Spacing/Spacing"
export { Text, TextProps } from "./components/atoms/Text/Text"

// Molecules
export { Button, ButtonProps } from "./components/molecules/Button/Button"
export { ButtonGroup, ButtonGroupProps } from "./components/molecules/Button/ButtonGroup"
export { ButtonIcon, ButtonIconProps } from "./components/molecules/ButtonIcon/ButtonIcon"
export { Checkbox, CheckboxProps } from "./components/molecules/Checkbox/Checkbox"
export { Flyout, FlyoutProps } from "./components/molecules/Flyout/Flyout"
export { Input, InputProps } from "./components/molecules/Input/Input"
export { Navigation, NavigationProps, NavigationSection } from "./components/molecules/Navigation/Navigation"
export { NavigationMenuList, NavigationMenuListProps } from "./components/molecules/Navigation/NavigationMenuList"
export { NavigationDesktop } from "./components/molecules/Navigation/NavigationDesktop"
export { NavigationMobile } from "./components/molecules/Navigation/NavigationMobile"
export { Select, SelectOption, SelectOptionGroup, SelectValue, SelectProps } from "./components/molecules/Select/Select"
export { TextArea, TextAreaProps } from "./components/molecules/TextArea/TextArea"
export { Tab, TabProps, TabPane } from "./components/molecules/Tab/Tab"
export { Loader, LoaderProps } from "./components/molecules/Loader/Loader"
export { LoaderMask, LoaderMaskProps } from "./components/molecules/Loader/LoaderMask"
export { Link, LinkProps } from "./components/molecules/Link/Link"

// Organisms
export { Header, HeaderProps } from "./components/organisms/Header/Header"
export { Modal, ModalProps } from "./components/organisms/Modal/Modal"
export {
    CookieNotification,
    CookieNotificationProps
} from "./components/organisms/CookieNotification/CookieNotification"
export { Toast, ToastProps } from "./components/organisms/Toasts/Toast"
export { ToastList, ToastListProps } from "./components/organisms/Toasts/ToastList"
export { ToastManager } from "./components/organisms/Toasts/ToastManager"

// Layout
export { Grid, GridProps } from "./components/layout/Grid/Grid"
export { GridChild, GridChildProps } from "./components/layout/Grid/GridChild"

// Screens
export { ErrorScreen, ErrorScreenProps } from "./components/screens/ErrorScreen/ErrorScreen"
export { MaintenanceScreen, MaintenanceScreenProps } from "./components/screens/MaintenanceScreen/MaintenanceScreen"

// Structures
export { ContentWrapper, ContentWrapperProps } from "./components/structures/ContentWrapper/ContentWrapper"

// Props
export { ClassNameProp } from "./lib/props/ClassNameProp"
export { ComponentProp } from "./lib/props/ComponentProp"

// Utilities
export { prefix } from "./lib/prefix"
export { getElementType } from "./lib/getElementType"
export { breakpoints } from "./lib/breakpoints"
export { BreakpointValues, mapBreakpointPropToClasses } from "./lib/BreakpointValues"

/**
 * TODO:
 * Semantic CSS: Customize it to remove global styles
 *
 * FLEX:
 * Should Margin and Padding have its own component or be included in Flex?
 * How are the margin and padding values?
 * What inline style properties does Flex really need?
 *
 * ICON:
 * Icon sizes? String Enum oder multiplier ähnlich margin?
 *
 * BUTTON:
 * Give Button "icon" convenience prop
 * Button type needed? "submit", "reset" etc.
 * Button scss muss auch einfacher gehen.
 */
