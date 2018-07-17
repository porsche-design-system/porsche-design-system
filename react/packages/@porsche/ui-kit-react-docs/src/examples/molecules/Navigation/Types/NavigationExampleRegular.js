import React from "react"
import { Navigation, NavigationMenuList } from "@porsche/ui-kit-react"

const sections = [
    {
        key: "1",
        label: "Titel1",
        counter: 6,
        component: "a",
        props: {
            href: "#/maximize/navigation-example-regular"
        },
        menu: (
            <NavigationMenuList
                submenu={[
                    {
                        key: "all",
                        label: "",
                        items: [
                            {
                                key: "1",
                                label: "Item 1",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            },
                            {
                                key: "2",
                                label: "Item 2",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            },
                            {
                                key: "3",
                                label: "Item 3",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            }
                        ]
                    }
                ]}
            />
        )
    },
    {
        key: "2",
        label: "Titel2",
        component: "a",
        props: {
            href: "#/maximize/navigation-example-regular"
        },
        menu: (
            <NavigationMenuList
                type="categorized"
                submenu={[
                    {
                        key: "1",
                        label: "Category 1",
                        items: [
                            {
                                key: "1",
                                label: "Item 1",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            },
                            {
                                key: "2",
                                label: "Item 2",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            },
                            {
                                key: "3",
                                label: "Item 3",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            }
                        ]
                    },
                    {
                        key: "2",
                        label: "Category 2",
                        items: [
                            {
                                key: "1",
                                label: "Item 1",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            },
                            {
                                key: "2",
                                label: "Item 2",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            },
                            {
                                key: "3",
                                label: "Item 3",
                                component: "a",
                                props: {
                                    href: "#/maximize/navigation-example-regular"
                                }
                            }
                        ]
                    }
                ]}
            />
        )
    },
    {
        key: "3",
        label: "Titel3",
        component: "a",
        props: {
            href: "#/maximize/navigation-example-regular"
        }
    }
]

const NavigationExampleRegular = () => {
    return <Navigation sections={sections} />
}

export default NavigationExampleRegular
