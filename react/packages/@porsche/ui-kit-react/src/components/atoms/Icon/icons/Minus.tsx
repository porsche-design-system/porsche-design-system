import * as React from "react"

const SvgMinus = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M40 22v4H8v-4h32z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgMinus
