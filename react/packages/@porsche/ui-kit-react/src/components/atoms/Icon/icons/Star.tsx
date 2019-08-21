import * as React from "react"

const SvgStar = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M24 2l6.5 14.2L46 18 34.5 28.6 38 44l-14-8-14 8 3.5-15.4L2 18l15.5-1.8L24 2z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgStar
