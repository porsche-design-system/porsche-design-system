import * as React from "react"

const SvgBox = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M46.2 1.8v44.3H1.8V1.8h44.4M48 0H0V48H48V0z" />
        <path fill="none" d="M1.8 1.8h44.3v44.3H1.8z" />
    </svg>
)

export default SvgBox
