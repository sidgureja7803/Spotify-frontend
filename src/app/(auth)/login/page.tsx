"use client"

import Input from "@/components/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import router from "next/router"
import { FormEvent, useRef, useState } from "react"

const Login = () => {

    const router = useRouter()

    const usernameRef = useRef<HTMLDivElement>(null)
    const passwordRef = useRef<HTMLDivElement>(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!username) {
            usernameRef.current && usernameRef.current.classList.add('error')
        }
        if (!password) {
            passwordRef.current && passwordRef.current.classList.add('error')
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, {
                username, password
            })
            const data = response.data
            if (data.token) {
                typeof window !== 'undefined' && window.localStorage.setItem('token', data.token)
                router.replace('/home')
            }

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <main className="flex items-center justify-start p-8 pt-8 flex-col gap-8">
            <form onSubmit={submitHandler} className="flex max-w-3xl w-full items-center justify-start p-8 pt-8 flex-col gap-8">
                <h1 className="font-semibold text-xl" >Login account</h1>
                <Input
                    name="username"
                    label="Enter username"
                    bind={setUsername}
                    forwardedRef={usernameRef}

                />
                <Input
                    name="password"
                    label="Enter password"
                    bind={setPassword}
                    forwardedRef={passwordRef}
                />
                <button className="bg-ui-default p-3 rounded-full px-10 text-xl mt-8" >next</button>
            </form>
        </main>
    )
}

export default Login
