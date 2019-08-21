import * as React from "react"

const SvgPrint = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <defs>
            <path id="print_svg__a" d="M0 0h48v48H0z" />
        </defs>
        <clipPath id="print_svg__b">
            <use xlinkHref="#print_svg__a" overflow="visible" />
        </clipPath>
        <path d="M14.3 10.5h20.2v3H14.3v-3z" clipPath="url(#print_svg__b)" />
        <g>
            <defs>
                <path id="print_svg__c" d="M0 0h48v48H0z" />
            </defs>
            <clipPath id="print_svg__d">
                <use xlinkHref="#print_svg__c" overflow="visible" />
            </clipPath>
            <path
                d="M6.8 15.7V30h7.4v7.5h20.3V30h6.7V15.7H6.8zm25.4 19.5H16.6v-9.6h15.6v9.6zm6-13.4h-3v-3h3v3z"
                clipPath="url(#print_svg__d)"
            />
        </g>
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPrint
