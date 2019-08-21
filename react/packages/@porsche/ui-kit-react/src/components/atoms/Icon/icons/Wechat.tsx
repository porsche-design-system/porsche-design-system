import * as React from "react"

const SvgWechat = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <defs>
            <path id="wechat_svg__a" d="M0 0h48v48H0z" />
        </defs>
        <clipPath id="wechat_svg__b">
            <use xlinkHref="#wechat_svg__a" overflow="visible" />
        </clipPath>
        <path
            d="M18.5 9.1c-7.3 0-13.3 5-13.3 11.3 0 3.6 2 6.6 5.3 9l-1.3 4 4.6-2.3c1.7.3 3 .7 4.6.7.4 0 .8 0 1.2-.1-.3-.9-.4-1.8-.4-2.8 0-5.8 5-10.5 11.3-10.5.4 0 .9 0 1.3.1-1-5.5-6.8-9.4-13.3-9.4zM14.2 18c-1 0-2-.7-2-1.7s1-1.7 2-1.7 1.7.7 1.7 1.7c0 1.1-.7 1.7-1.7 1.7zm9.3 0c-1 0-2-.7-2-1.7s1-1.7 2-1.7 1.7.7 1.7 1.7c0 1.1-.7 1.7-1.7 1.7z"
            clipPath="url(#wechat_svg__b)"
        />
        <g>
            <defs>
                <path id="wechat_svg__c" d="M0 0h48v48H0z" />
            </defs>
            <clipPath id="wechat_svg__d">
                <use xlinkHref="#wechat_svg__c" overflow="visible" />
            </clipPath>
            <path
                d="M42.8 28.7c0-5.3-5.3-9.6-11.3-9.6-6.3 0-11.3 4.3-11.3 9.6s5 9.6 11.3 9.6c1.3 0 2.7-.3 4-.7l3.6 2-1-3.3c2.7-2 4.6-4.6 4.7-7.6zm-15-1.7c-.7 0-1.3-.7-1.3-1.3 0-.7.7-1.3 1.3-1.3 1 0 1.7.7 1.7 1.3s-.7 1.3-1.7 1.3zm7.3 0c-.7 0-1.3-.7-1.3-1.3 0-.7.7-1.3 1.3-1.3 1 0 1.7.7 1.7 1.3s-.7 1.3-1.7 1.3z"
                clipPath="url(#wechat_svg__d)"
            />
        </g>
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgWechat
