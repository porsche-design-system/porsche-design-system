const mathSign =
    Math.sign ||
    function(x) {
        const val = +x

        if (val === 0 || isNaN(val)) return val
        return val > 0 ? 1 : -1
    }

const scrollToAnchor = () => {
    const locationHash = location.hash
    // get only "real" hast and ignore the routing hash to prevent errors
    const anchor =
        location.hash && location.hash.match(/#[^\/]+/g)
            ? document.querySelector(location.hash.match(/#[^\/]+/g))
            : null
    const offsetY = window.scrollY || window.pageYOffset

    // no scroll to target, stop
    if (!anchor) return

    const elementTop = Math.round(anchor.getBoundingClientRect().top)

    // scrolled to element, stop
    if (elementTop === 0) return

    // hit max scroll boundaries, stop
    const isScrolledToTop = offsetY === 0
    const isScrolledToBottom = offsetY + window.innerHeight === document.body.scrollHeight
    const scrollStep = Math.ceil(Math.abs(elementTop / 8)) * mathSign(elementTop)

    if ((isScrolledToBottom && scrollStep > 0) || (isScrolledToTop && scrollStep < 0)) return

    // more scrolling to do!
    scrollBy(0, scrollStep)
    requestAnimationFrame(scrollToAnchor)
}

export default scrollToAnchor
