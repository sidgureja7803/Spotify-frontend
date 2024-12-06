import React from 'react'
import Input from '@/components/input'
import './style.css'
import Action from '@/components/action'
import Link from 'next/link'

const Auth = () => {
    return (
        <main className='authOverlay h-full w-full flex justify-center items-center'>
            <div className="actions items-center justify-center flex w-full h-full p-6 bg-gradient-to-t via-bg-primary via-50% from-bg-primary to-bg-highlight/25">
                <div className='max-w-xl h-full w-full flex flex-col gap-4 justify-around  items-center' >
                    <div className='flex flex-col gap-4 items-center' >
                        <img className='h-14 w-14' src="/Brand/Logo.svg" />
                        <h1 className='text-center font-bold text-2xl' >Millions of songs, <br /> Free on Spotify</h1>
                    </div>

                    <div className='flex flex-col gap-4 items-center w-full' >
                        <Action
                            border={false}
                            backgroundColor={"bg-bg-highlight"}
                            title={"Sign up free"}
                            color={"text-text-secondary"}
                            href='/signUp'
                        />
                        <Action
                            border={true}
                            title={"Continue with Google"}
                            logo={'/google.svg'}
                            href='/signUp'
                        />
                        <Link href='/login' className='bg-transparent w-full p-4 font-semibold text-xl pt-2 text-center'  >Log in</Link>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default Auth