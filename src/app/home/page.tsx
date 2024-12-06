"use client"

import React, { useEffect, useState, useMemo } from 'react'
import './home.css'
import axios from '../../../extends/axios';
import { useAppSelector, useAppDispatch } from '../../redux/hook'
import { setTracks, setCurrentTrack } from '../../redux/reducers/music'
import LastTracks from '@/components/lastTracks';
import Artists from '@/components/artists';


interface Track {
    title: string;
    artists: string[];
    album: string;
    year: number;
    tags: string[];
    explicit: boolean;
    poster: string;
    url: string;
    plays: number;
    likes: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const Home = () => {

    const tracks = useAppSelector(state => state.music.value.tracks);
    const dispatch = useAppDispatch();
    const currentTrack = useAppSelector(state => state.music.value.currentTrack);

    useEffect(() => {
        const getTracks = async () => {
            try {
                if (tracks.length > 0) return;
                const response = await axios.post('/getTracks');
                dispatch(setTracks(response.data.tracks));
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        }
        const getLastTrack = async () => {
            try {
                const response = await axios.post('/getLastTrack');
                dispatch(setCurrentTrack(response.data.track.trackId));
            } catch (error) {
                console.error('Error fetching last track:', error);
            }
        }
        getLastTrack();

        getTracks();
    }, []);
    return (
        <section className="w-full flex flex-col">
            <nav className='p-4 py-6 flex' >
                <h1 className='font-semibold text-xl' >Hello, Ankur</h1>
            </nav>

            <LastTracks />


            <h1 className='px-4'>Explore</h1>
            <div className="audios-explore p-4 w-full items-center justify-center place-items-center">
                {tracks.map((track: Track, index: number) => (
                    <div
                        key={index}
                        className="audio-card h-full bg-bg-primary-default rounded-lg shadow-md flex w-full flex-col gap-3 p-2"
                        onClick={() => dispatch(setCurrentTrack(track))}
                    >
                        <div className="audio-card-image overflow-hidden w-fit aspect-square bg-black rounded-lg">
                            <img className='h-full w-full aspect-square' src={track.poster} alt="" />
                        </div>
                        <div className="audio-card-info flex flex-col w-full truncate">
                            <h3 className='font-semibold text-md truncate w-full'>{track.title}</h3>
                            <p className='font-light text-sm truncate w-full'>{track.artists.map((artist: any) => artist.name).join('/')}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default Home