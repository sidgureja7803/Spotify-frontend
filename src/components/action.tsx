import Link from 'next/link'
import React from 'react'
import { text } from 'stream/consumers'

interface actionProps {
    border: boolean,
    backgroundColor?: string,
    logo?: string,
    title: string,
    color?: string,
    href: string,
}

const Action: React.FC<actionProps> = ({ border, backgroundColor, logo, title, color, href }) => {
    return (
        <Link href={href} className={`w-full relative p-4 rounded-full ${backgroundColor} ${border && "border border-slate-200"}`}  >
            <h1 className={`text-center text-xl font-semibold ${color || "text-text-primary"}`} >
                {title}
            </h1>
            {logo &&
                <img className='absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 ' src={logo} alt="" />
            }
        </Link>
    )
}

export default Action