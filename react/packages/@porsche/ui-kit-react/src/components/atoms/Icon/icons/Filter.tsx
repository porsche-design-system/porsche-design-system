import * as React from "react"

const SvgFilter = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M42 7.2V4H6v3.2c0 .5.2 1 .6 1.4L22 24v14l5 6V24L41.5 8.6c.3-.4.5-.9.5-1.4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgFilter
