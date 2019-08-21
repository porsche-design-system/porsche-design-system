import * as React from "react"

const SvgLinkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <defs>
            <path id="linkedin_svg__a" d="M0 0h48v48H0z" />
        </defs>
        <clipPath id="linkedin_svg__b">
            <use xlinkHref="#linkedin_svg__a" overflow="visible" />
        </clipPath>
        <path
            d="M7.5 18.1h7.1v22.7H7.5V18.1zm3.6-11.3c2.3 0 4.1 1.8 4.1 4.1S13.4 15 11.1 15 7 13.1 7 10.9c0-2.3 1.8-4.1 4.1-4.1z"
            clipPath="url(#linkedin_svg__b)"
        />
        <g>
            <defs>
                <path id="linkedin_svg__c" d="M0 0h48v48H0z" />
            </defs>
            <clipPath id="linkedin_svg__d">
                <use xlinkHref="#linkedin_svg__c" overflow="visible" />
            </clipPath>
            <path
                d="M19 18.1h6.8v3.1h.1c.9-1.8 3.2-3.7 6.7-3.7 7.1 0 8.5 4.7 8.5 10.8v12.4h-7v-11c0-2.6-.1-6-3.7-6-3.7 0-4.2 2.9-4.2 5.8v11.2h-7L19 18.1z"
                clipPath="url(#linkedin_svg__d)"
            />
        </g>
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgLinkedin
