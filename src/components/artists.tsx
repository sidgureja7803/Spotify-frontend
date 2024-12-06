"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import * as RemixIcon from "@remixicon/react"
import { useAppDispatch, useAppSelector } from '../redux/hook';
import axios from '../../extends/axios';
import { setLastTracks, setCurrentTrack, setArtists } from '../redux/reducers/music';


const Artists = () => {

    const dispatch = useAppDispatch();
    const artists = useAppSelector(state => state.music.value.artists);

    useEffect(() => {
        const getArtists = async () => {
            try {
                if (artists.length > 0) return;
                const response = await axios.post('/getArtists');
                dispatch(setArtists(response.data.artists));
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        }
        getArtists();
    }, [])

    return (
        <>
            <div className="artists h-fit flex gap-2 scroll-smooth w-full pl-4 overflow-x-auto mb-4">
                {
                    artists[0] ? artists.map(artist => (
                        <div className="artist shrink-0 flex flex-col items-center w-fit h-fit">
                            <img className='rounded-full aspect-square h-20 w-20 object-cover' onError={(event) => {
                                (event.target as HTMLImageElement).src = 'https://firebasestorage.googleapis.com/v0/b/beat-stream.appspot.com/o/user.png?alt=media&token=a8dc5a07-37b7-4bbc-a1c3-28f9bcdccb23'
                            }} src={artist.imageUrl} alt="" />
                            <p className='max-w-20 truncate' >{artist.name}</p>
                        </div>
                    )) : <></>
                }
            </div>
        </>
    )
}

export default Artists