import * as React from "react"

const SvgShare = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <defs>
            <path id="share_svg__a" d="M0 0h48v48H0z" />
        </defs>
        <clipPath id="share_svg__b">
            <use xlinkHref="#share_svg__a" overflow="visible" />
        </clipPath>
        <path
            d="M8.2 25.5c0 2.3.8 4.2 2.4 5.9s3.6 2.4 5.8 2.4c2 0 3.8-.7 5.2-2l4.2 3.6c-.3.6-.5 1.3-.5 2.1 0 1.4.5 2.7 1.5 3.7s2.3 1.5 3.7 1.5 2.7-.5 3.7-1.5 1.5-2.3 1.5-3.7-.5-2.7-1.5-3.7-2.3-1.5-3.7-1.5c-1.1 0-2 .3-2.9.8l-4.1-3.5c.7-1.2 1-2.6 1-4 0-1.9-.6-3.6-1.7-5.1l5.4-6c.7.3 1.4.5 2.2.5 1.4 0 2.7-.5 3.7-1.5s1.5-2.3 1.5-3.7-.1-2.7-1.1-3.8c-1-1-2.3-1.5-3.7-1.5S28.1 5 27 6c-1 1-1.5 2.3-1.5 3.7 0 1 .2 1.9.8 2.7l-5.4 6.1c-1.3-.8-2.8-1.2-4.3-1.2-2.2 0-4.2.8-5.8 2.4-1.7 1.6-2.6 3.6-2.6 5.8z"
            clipPath="url(#share_svg__b)"
        />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgShare
