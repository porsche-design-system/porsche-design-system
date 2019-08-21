import * as React from "react"

const SvgCheck = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M42 13h-5.7L20 29.3 13.7 23H8l12 12z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgCheck
