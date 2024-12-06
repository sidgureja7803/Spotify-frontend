"use client"
import React, { SetStateAction } from 'react'
import * as RemixIcon from "@remixicon/react"

export interface IconInputProps {
    Icon?: RemixIcon.RemixiconComponentType;
    inputPlaceholder?: string;
    forwardType?: string;
    bind?: Function;
}

const IconInput: React.FC<IconInputProps> = ({
    Icon = RemixIcon.RiSearch2Line,
    inputPlaceholder = "Search",
    forwardType = 'text',
    bind = () => { }
}) => {
    return (
        <>
            <div className='bg-slate-100 rounded-md relative' >
                <Icon className='icon absolute top-1/2 left-4 transform -translate-y-1/2 text-text-secondary' />
                <input onInput={(event) => { bind(event.currentTarget.value) }} type={forwardType} placeholder={inputPlaceholder} className="icon-input bg-transparent p-4 px-6 pl-14 text-xl w-full outline-none border-none text-text-secondary" />
            </div>
        </>
    )
}

export default IconInput