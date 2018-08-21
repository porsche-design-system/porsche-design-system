import * as React from "react"
import { shallow } from "enzyme"
import { Loader, LoaderProps } from "./Loader"
import { prefix } from "../../../lib"

describe("Loader component", () => {
    const createComponent = (props: LoaderProps) => {
        return shallow(<Loader {...props} />)
    }

    it("should be rendered as default loader", () => {
        // Arrange
        const props: LoaderProps = {}
        // Act
        const link = createComponent(props)
        // Assert
        expect(link.find(`.${prefix("loader")}`).length).toBe(1)
        expect(link.find(`.${prefix("loader--small")}`).length).toBe(0)
        expect(link.find(`.${prefix("loader--inverted")}`).length).toBe(0)
    })

    it("should be rendered as small loader", () => {
        // Arrange
        const props: LoaderProps = { size: "small" }
        // Act
        const link = createComponent(props)
        // Assert
        expect(link.find(`.${prefix("loader")}`).length).toBe(1)
        expect(link.find(`.${prefix("loader--small")}`).length).toBe(1)
    })

    it("should be rendered as inverted loader", () => {
        // Arrange
        const props: LoaderProps = { inverted: true }
        // Act
        const link = createComponent(props)
        // Assert
        expect(link.find(`.${prefix("loader")}`).length).toBe(1)
        expect(link.find(`.${prefix("loader--inverted")}`).length).toBe(1)
    })
})
