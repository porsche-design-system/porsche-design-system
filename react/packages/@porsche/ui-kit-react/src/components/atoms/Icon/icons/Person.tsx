import * as React from "react"

const SvgPerson = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M24 33c-1.6 0-3.1-.6-4.4-1.7-4.1.5-8 1.8-11.6 3.7v4h32v-4c-3.5-1.9-7.4-3.2-11.6-3.7-1.3 1.1-2.8 1.7-4.4 1.7zM24 9c-5 0-8 4-8 9 0 6.1 3.6 13 8 13s8-6.9 8-13c0-5-3-9-8-9z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPerson
