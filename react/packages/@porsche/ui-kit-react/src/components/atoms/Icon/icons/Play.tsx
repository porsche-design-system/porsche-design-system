import * as React from "react"

const SvgPlay = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M8 40V8l32 16L8 40z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPlay
