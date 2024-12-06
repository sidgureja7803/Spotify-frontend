"use client"
import { useRouter } from "next/navigation";
import * as RemixIcon from "@remixicon/react"
import NaveItem from "@/components/naveItem";
import { useEffect, useRef, useState } from "react";
import { store } from '../../redux/store'
import { Provider } from 'react-redux'
import Player from "../../components/player";









export default function ({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter()


    const token = typeof window !== 'undefined' && window.localStorage.getItem('token')
    useEffect(() => {
        if (!token)
            return router.replace('/login')
    }, [])


    const Home = useRef<HTMLButtonElement>(null)
    const Search = useRef<HTMLButtonElement>(null)
    const Library = useRef<HTMLButtonElement>(null)

    function setUnActive() {
        Home.current?.classList.remove('active')
        Search.current?.classList.remove('active')
        Library.current?.classList.remove('active')
    }



    return (
        <Provider store={store}>
            <main className="w-full h-full overflow-y-auto pb-20">
                {children}
                <section className="bottom w-full fixed bottom-0 flex flex-col items-center gap-1">
                    <Player />
                    <nav className="bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-bg-primary w-full p-5 px-0 grid grid-cols-3">
                        <NaveItem
                            Icon={RemixIcon.RiHome2Fill}
                            forwardOnClick={(event) => {
                                setUnActive();
                                Home.current?.classList.add('active');
                                router.replace('/home');
                            }}
                            label="Home"
                            forwardRef={Home}
                        />
                        <NaveItem
                            Icon={RemixIcon.RiSearch2Line}
                            forwardOnClick={(event) => {
                                setUnActive();
                                Search.current?.classList.add('active');
                                router.replace('/home/search');
                            }}
                            label="Search"
                            forwardRef={Search}
                        />
                        <NaveItem
                            Icon={RemixIcon.RiVoiceprintLine}
                            forwardOnClick={(event) => {
                                setUnActive();
                                Library.current?.classList.add('active');
                                router.replace('/home/library');
                            }}
                            label="Your Library"
                            forwardRef={Library}
                        />
                    </nav>
                </section>
            </main>
        </Provider>
    );
}
