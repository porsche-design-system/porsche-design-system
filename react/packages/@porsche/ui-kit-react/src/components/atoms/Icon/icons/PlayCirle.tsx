import * as React from "react"

const SvgPlayCirle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M24 2C11.8 2 2 11.8 2 24s9.8 22 22 22 22-9.8 22-22S36.2 2 24 2zm0 40c-9.9 0-18-8.1-18-18S14.1 6 24 6s18 8.1 18 18-8.1 18-18 18zm-6-26l16 8-16 8V16z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPlayCirle
