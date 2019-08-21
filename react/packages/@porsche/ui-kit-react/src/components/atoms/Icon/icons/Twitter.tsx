import * as React from "react"

const SvgTwitter = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <defs>
            <path id="twitter_svg__a" d="M0 0h48v48H0z" />
        </defs>
        <clipPath id="twitter_svg__b">
            <use xlinkHref="#twitter_svg__a" overflow="visible" />
        </clipPath>
        <path
            d="M6 35.3c3.6 2.2 7.5 3.3 11.6 3.3 6 0 11-2.1 15.1-6.4 4.1-4.2 6-9.3 5.7-15.3v-.3c1.4-1 2.6-2.3 3.6-3.8-1.1.6-2.5 1-4.1 1.2.6-.3 1.2-.9 1.8-1.7.7-.8 1.1-1.6 1.3-2.3-.6.4-1.3.7-2.3 1.1-1 .3-1.7.5-2.3.5-1.5-1.5-3.3-2.2-5.4-2.2-2 0-3.7.7-5.2 2.2-1.5 1.4-2.2 3.2-2.2 5.2 0 .6.1 1.1.2 1.7-2.9-.1-5.8-.8-8.7-2.2S9.8 13.1 8 10.8c-.9 2-1.1 3.9-.6 5.7s1.5 3.2 2.9 4c-1.4.1-2.5-.2-3.2-.8-.1 1.6.4 3 1.3 4.4s2.4 2.3 4.5 2.9c-.7.4-1.7.4-3.1.2.1 1.2.9 2.3 2.2 3.4s2.8 1.6 4.5 1.6c-.8.9-2.2 1.8-4.1 2.5s-4.1 1-6.4.6z"
            clipPath="url(#twitter_svg__b)"
        />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgTwitter
