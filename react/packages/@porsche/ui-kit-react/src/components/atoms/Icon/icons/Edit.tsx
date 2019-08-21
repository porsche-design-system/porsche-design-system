import * as React from "react"

const SvgEdit = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M32 10l6 6-24 24-10 4 4-10 24-24zm6-6l-4 4 6 6 4-4-6-6z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgEdit
