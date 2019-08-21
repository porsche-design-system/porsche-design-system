import * as React from "react"

const SvgArrowUp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M24 8L8 24h32z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgArrowUp
