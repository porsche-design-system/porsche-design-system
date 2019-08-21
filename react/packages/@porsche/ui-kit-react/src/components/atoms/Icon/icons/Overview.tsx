import * as React from "react"

const SvgOverview = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M35.9 14.9L40 19V8H29l4.1 4.1-9.1 9.1-9.1-9.1L19 8H8v11l4.1-4.1 9.1 9.1-9.1 9.1L8 29v11h11l-4.1-4.1 9.1-9.1 9.1 9.1L29 40h11V29l-4.1 4.1-9.1-9.1z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgOverview
