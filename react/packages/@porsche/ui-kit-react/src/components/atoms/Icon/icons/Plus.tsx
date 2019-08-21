import * as React from "react"

const SvgPlus = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M40 26H26v14h-4V26H8v-4h14V8h4v14h14v4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPlus
