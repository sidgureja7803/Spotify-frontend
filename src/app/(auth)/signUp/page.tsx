"use client"
import Input from "@/components/input"
import { FormEvent, useRef, useState } from "react"
import axios from "axios"
import customAxios from '../../../../extends/axios'
import { useRouter } from "next/navigation"

const SignUp = () => {

    const router = useRouter()

    const usernameRef = useRef<HTMLDivElement>(null)
    const emailRef = useRef<HTMLDivElement>(null)
    const passwordRef = useRef<HTMLDivElement>(null)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!username) {
            usernameRef.current && usernameRef.current.classList.add('error')
        }
        if (!email) {
            emailRef.current && emailRef.current.classList.add('error')
        }
        if (!password) {
            passwordRef.current && passwordRef.current.classList.add('error')
        }

        if (!username || !email || !password) {
            console.log("username password and email is required ")
            return
        }

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/register`, {
                username, email, password
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
        <main className="flex justify-center w-full h-full" >
            <form onSubmit={submitHandler} className="flex max-w-3xl w-full items-center justify-start p-8 pt-8 flex-col gap-8">
                <h1 className="font-semibold text-xl" >Create account</h1>
                <Input
                    label="Enter username"
                    name="username"
                    bind={setUsername}
                    forwardedRef={usernameRef}
                />
                <Input
                    label="Enter email"
                    name="email"
                    type="email"
                    bind={setEmail}
                    forwardedRef={emailRef}
                />
                <Input
                    label="Enter password"
                    name="password"
                    type="password"
                    bind={setPassword}
                    forwardedRef={passwordRef}
                />
                <button className="bg-ui-default p-3 rounded-full px-10 text-xl mt-8" >next</button>
            </form>
        </main>

    )
}

export default SignUp
