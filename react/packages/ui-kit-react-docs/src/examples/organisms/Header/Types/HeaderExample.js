import React from "react"
import { Header, NavigationMenuList } from "@porsche/ui-kit-react"

const sections = [
    {
        key: "1",
        label: "Titel1",
        counter: 6,
        component: "a",
        props: {
            href: "#"
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
                                    href: "#"
                                }
                            },
                            {
                                key: "2",
                                label: "Item 2",
                                component: "a",
                                props: {
                                    href: "#"
                                }
                            },
                            {
                                key: "3",
                                label: "Item 3",
                                component: "a",
                                props: {
                                    href: "#"
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
            href: "#"
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
                                    href: "#"
                                }
                            },
                            {
                                key: "2",
                                label: "Item 2",
                                component: "a",
                                props: {
                                    href: "#"
                                }
                            },
                            {
                                key: "3",
                                label: "Item 3",
                                component: "a",
                                props: {
                                    href: "#"
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
                                    href: "#"
                                }
                            },
                            {
                                key: "2",
                                label: "Item 2",
                                component: "a",
                                props: {
                                    href: "#"
                                }
                            },
                            {
                                key: "3",
                                label: "Item 3",
                                component: "a",
                                props: {
                                    href: "#"
                                }
                            }
                        ]
                    }
                ]}
            />
        )
    }
]

const HeaderExample = () => (
    <Header
        sections={sections}
        logoComponent={"a"}
        logoProps={{
            href: "#"
        }}
    />
)

export default HeaderExample
