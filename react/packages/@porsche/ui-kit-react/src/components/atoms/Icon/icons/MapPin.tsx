import * as React from "react"

const SvgMapPin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M24 2C15 2 8 9 8 18c0 11 16 28 16 28s16-17 16-28c0-9-7-16-16-16z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgMapPin
