"use strict"

export class PolyfillPlaceholderShown {
    constructor(element) {
        if (!this.isPlaceholderShownSupported()) {
            this.element = element

            this.init()
            this.events()
        }
    }

    init() {
        setTimeout(() => {
            this.addRemovePlaceholderShownClass()
        })
    }

    events() {
        this.element.addEventListener("change", (evt) => this.addRemovePlaceholderShownClass(evt))
        this.element.addEventListener("keyup", (evt) => this.addRemovePlaceholderShownClass(evt))
        this.element.addEventListener("focus", (evt) => this.addRemovePlaceholderShownClass(evt))
    }

    addRemovePlaceholderShownClass() {
        this.element.classList[this.element.value ? "add" : "remove"]("placeholder-not-shown")
    }

    isPlaceholderShownSupported() {
        try {
            document.querySelector("div:placeholder-shown")
            return true
        } catch (e) {
            return false
        }
    }
}
