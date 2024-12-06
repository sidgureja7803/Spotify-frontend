

import React, { FC, Ref } from 'react'
import './style.css'

interface inputProps {
    label?: string,
    name?: string,
    type?: string,
    bind?: Function,
    forwardedRef?: React.RefObject<HTMLDivElement>
}

const Input: FC<inputProps> = ({ label, name, type, bind, forwardedRef }) => {

    function inputHandler(event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        bind && bind(value)
    }

    return (
        <div ref={forwardedRef} className='input w-full flex flex-col gap-1  text-xl'>
            <label htmlFor={name} className='font-semibold text-2xl'>
                {label || `What's your username ?`}
            </label>
            <input
                className='p-4 bg-ui-default  text-2xl rounded-md border-transparent w-full outline-none text-text-primary'
                type={type || "text"}
                name={name}
                id={name}
                onInput={inputHandler}
            />
        </div>
    )
}

export default Input