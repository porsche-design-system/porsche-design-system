import * as React from "react"

const SvgPause = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M30 8h6v32h-6V8zM12 40h6V8h-6v32z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPause
