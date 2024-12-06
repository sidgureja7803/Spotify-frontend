import React, { MouseEventHandler } from 'react'
import * as RemixIcon from "@remixicon/react"

interface navItemProps {
    label: string,
    Icon: RemixIcon.RemixiconComponentType,
    forwardOnClick: MouseEventHandler<HTMLButtonElement>,
    forwardRef: React.RefObject<HTMLButtonElement>,
    isActive?: boolean
}

const NaveItem: React.FC<navItemProps> = ({ label, Icon, forwardOnClick, forwardRef, isActive }) => {
    return (
        <button ref={forwardRef} onClick={forwardOnClick} className={`nav-item flex flex-col justify-center items-center`} >
            <Icon className='icon opacity-40' />
            <p className='opacity-60' >{label}</p>
        </button>
    )
}

export default NaveItem
