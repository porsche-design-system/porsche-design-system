import * as React from "react"
import { mount, ReactWrapper, shallow } from "enzyme"

import { prefix } from "../../../lib"
import { PaginationList, PaginationListProps } from "./PaginationList"

describe("Pagination component", () => {
    const createComponent = (props: PaginationListProps): ReactWrapper => {
        return mount(<PaginationList {...props} />)
    }

    describe("theme state", () => {
        it("should use the default theme", () => {
            // Arrange
            const props: PaginationListProps = {
                activePage: 1,
                pageTotal: 10,
                pageRange: 1,
                onClick: () => undefined
            }

            // Act
            const componentWrapper = createComponent(props)
            const theme = componentWrapper.prop("theme")

            // Assert
            expect(theme).toBe(undefined)
        })

        it("should use the inverted theme", () => {
            // Arrange
            const props: PaginationListProps = {
                activePage: 1,
                pageTotal: 10,
                pageRange: 1,
                theme: "inverted",
                onClick: () => undefined
            }

            // Act
            const componentWrapper = createComponent(props)
            const theme = componentWrapper.prop("theme")

            // Assert
            expect(theme).toEqual("inverted")
        })
    })

    describe("page range", () => {
        it("should display the correct amount of items for desktop", () => {
            // Arrange
            const props: PaginationListProps = {
                activePage: 1,
                pageTotal: 10,
                pageRange: 1,
                onClick: () => undefined
            }

            // Act
            const componentWrapper = createComponent(props)
            const listItems = componentWrapper.find(`.${prefix("pagination__item")}`)

            // Assert
            expect(listItems.length).toBe(7)
        })

        it("should display the correct amount of items for mobile", () => {
            // Arrange
            const props: PaginationListProps = {
                activePage: 1,
                pageTotal: 10,
                pageRange: 0,
                onClick: () => undefined
            }

            // Act
            const componentWrapper = createComponent(props)
            const listItems = componentWrapper.find(`.${prefix("pagination__item")}`)

            // Assert
            expect(listItems.length).toBe(5)
        })
    })

    describe("active state", () => {
        it("should mark the current active page item", () => {
            // Arrange
            const props: PaginationListProps = {
                activePage: 1,
                pageTotal: 10,
                pageRange: 1,
                onClick: () => undefined
            }

            // Act
            const componentWrapper = createComponent(props)
            const firstItem = componentWrapper.find(`.${prefix("pagination__items")}`).childAt(0)
            const activeItem = firstItem.find(`.${prefix("pagination__goto--current")}`)

            // Assert
            expect(firstItem.prop("isActive")).toBe(true)
            expect(activeItem.length).toBe(1)
            expect(activeItem.type()).toBe("span")
        })
    })

    describe("onClick", () => {
        it("should call the callback", () => {
            // Arrange
            const onClickMock = jest.fn()
            const props: PaginationListProps = {
                activePage: 1,
                pageTotal: 10,
                pageRange: 1,
                onClick: onClickMock
            }

            // Act
            const componentWrapper = createComponent(props)
            componentWrapper
                .find(`a.${prefix("pagination__goto")}`)
                .first()
                .simulate("click")

            // Assert
            expect(onClickMock).toHaveBeenCalled()
        })
    })
})
