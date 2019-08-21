import * as React from "react"

const SvgWarningCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M40 24c0-8.8-7.2-16-16-16S8 15.2 8 24s7.2 16 16 16 16-7.2 16-16zm-15 5h-2l-1.2-17h4.4L25 29zm1.2 7h-4.4v-4h4.4v4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgWarningCircle
