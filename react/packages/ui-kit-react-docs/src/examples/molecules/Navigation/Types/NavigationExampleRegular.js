import React from "react"
import { Navigation, NavigationMenuList } from "@porsche/ui-kit-react"

const sections = [
    {
        key: "1",
        label: "Titel1",
        counter: 6,
        link: "http://www.google.com",
        menu: <NavigationMenuList categories={[
            {
                key: "all",
                label: "",
                items: [
                    {
                        key: "1",
                        label: "Item 1",
                        link: () => { alert("Item 1")}
                    },
                    {
                        key: "2",
                        label: "Item 2",
                        link: () => { alert("Item 2")}
                    },
                    {
                        key: "3",
                        label: "Item 3",
                        link: () => { alert("Item 3")}
                    }
                ]
            }
        ]}/>
    },
    {
        key: "2",
        label: "Titel2",
        link: "http://www.google.com",
        menu: <NavigationMenuList type="categorized" categories={[
            {
                key: "1",
                label: "Category 1",
                items: [
                    {
                        key: "1",
                        label: "Item 1",
                        link: () => { alert("Item 1")}
                    },
                    {
                        key: "2",
                        label: "Item 2",
                        link: () => { alert("Item 2")}
                    },
                    {
                        key: "3",
                        label: "Item 3",
                        link: () => { alert("Item 3")}
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
                        link: () => { alert("Item 1")}
                    },
                    {
                        key: "2",
                        label: "Item 2",
                        link: () => { alert("Item 2")}
                    },
                    {
                        key: "3",
                        label: "Item 3",
                        link: () => { alert("Item 3")}
                    }
                ]
            }
        ]}/>
    }
]

const NavigationExampleRegular = () => {
    return (
        <Navigation sections={sections} />
    )
}

export default NavigationExampleRegular
