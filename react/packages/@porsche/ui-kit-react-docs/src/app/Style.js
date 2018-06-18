const style = {}
const sidebarWidth = 300

style.container = {}

style.menu = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: sidebarWidth,
    paddingBottom: "1em",
    overflowY: "scroll"
}

style.main = {
    background: "#f7f7f7",
    marginLeft: sidebarWidth,
    minWidth: parseInt(sidebarWidth, 10) + 300
}

export default style
