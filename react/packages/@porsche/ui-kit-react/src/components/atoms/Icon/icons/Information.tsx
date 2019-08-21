import * as React from "react"

const SvgInformation = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M24 8C15.2 8 8 15.2 8 24s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8zm2.2 28h-4.4V19h4.4v17zm0-20h-4.4v-4h4.4v4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgInformation
