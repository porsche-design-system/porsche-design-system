import * as React from "react"

const SvgSubmenu = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M8 16v-4h32v4H8zm3.8 10h4v-4h-4v4zm0 10h4v-4h-4v4zm8-10H40v-4H19.8v4zm0 10H40v-4H19.8v4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgSubmenu
