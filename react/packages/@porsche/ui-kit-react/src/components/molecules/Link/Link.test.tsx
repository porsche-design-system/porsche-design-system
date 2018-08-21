import * as React from "react"
import { shallow } from "enzyme"
import { Link, LinkProps } from "./Link"
import { prefix } from "../../../lib"

describe("Link component", () => {
    const createComponent = (props: LinkProps) => {
        return shallow(<Link {...props}>My Link</Link>)
    }

    it("should be rendered as simple link", () => {
        // Arrange
        const props = {}
        // Act
        const link = createComponent(props)
        // Assert
        expect(link.find(`.${prefix("link-text")}`).length).toBe(1)
        expect(link.find(`.${prefix("link-text__label")}`).length).toBe(1)
    })

    it("should be rendered as link with icon", () => {
        // Arrange
        const props = { withIcon: true }
        // Act
        const link = createComponent(props)
        // Assert
        expect(link.find(`.${prefix("link-icon-text")}`).length).toBe(1)
        expect(link.find(`.${prefix("icon")}`).length).toBe(1)
        expect(link.find(`.${prefix("icon--arrow_right_hair")}`).length).toBe(1)
        expect(link.find(`.${prefix("link-icon-text__icon")}`).length).toBe(1)
        expect(link.find(`.${prefix("link-icon-text__label")}`).length).toBe(1)
        expect(link.find(`.${prefix("link-icon-text__label--black")}`).length).toBe(1)
    })
})
