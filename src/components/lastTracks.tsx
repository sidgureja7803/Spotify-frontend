"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import * as RemixIcon from "@remixicon/react"
import { useAppDispatch, useAppSelector } from '../redux/hook';
import axios from '../../extends/axios';
import { setLastTracks, setCurrentTrack } from '../redux/reducers/music';

const LastTracks = () => {

    const dispatch = useAppDispatch();
    const lastTracks = useAppSelector(state => state.music.value.lastTracks);

    useEffect(() => {
        const getLastTracks = async () => {
            try {
                const response = await axios.post('/getLastTracks');
                dispatch(setLastTracks(response.data.tracks));
            } catch (error) {
                console.error('Error fetching last tracks:', error);
            }
        }
        getLastTracks();
    }, []);

    return (
        <div className="audios p-4 flex flex-col gap-3">
            <div className="recent">
                {lastTracks[0] ?
                    lastTracks.map(track => (<div className="audio-card bg-bg-primary-default rounded-lg shadow-md flex gap-3 p-2" onClick={() => {
                        dispatch(setCurrentTrack(track))
                    }}>
                        <div className="flex-shrink-0 audio-card-image overflow-hidden w-fit h-16 aspect-square bg-black rounded-lg">
                            <img className='h-full w-full aspect-square' src={track.poster} alt="" />
                        </div>
                        <div className="audio-card-info flex flex-col w-3/5">
                            <h3 className='font-semibold text-md whitespace-nowrap truncate w-full' >{track.title}</h3>
                            <p className='font-light text-sm whitespace-nowrap truncate w-full' >{track.artists.map(artist => artist.name).join(' / ')}</p>
                        </div>
                    </div>)) : <></>}
            </div>
        </div>
    )
}

export default LastTracks