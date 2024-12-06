"use client"

import IconInput from '@/components/iconInput/iconInput'
import React, { useState } from 'react'
import { Track, setCurrentTrack } from '../../../redux/reducers/music'
import { useAppDispatch } from '../../../redux/hook'
import { throttle } from '../../../../utils/utils'
import axios from '../../../../extends/axios'
const Search = () => {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("")
    const dispatch = useAppDispatch()

    const getSearchResults = throttle(async (search: string) => {

        try {
            const response = await axios.post<{ tracks: Track[] }>('/search', { search });
            console.log('Search results:', response.data.tracks);
            setSearchResults(response.data.tracks);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

    }, 500)


    function updateQuery(query: string) {
        if (query === "") {
            setSearchResults([]);
            return;
        };
        setSearchQuery(query);
        getSearchResults(query);
    }

    return (
        <section className='w-full flex flex-col p-4 py-6 gap-2' >
            <h1 className='text-2xl mb-4' >Search</h1>
            <IconInput bind={updateQuery} />
            <div className="searchResults">
                {searchResults.reverse().map((track, index) => (
                    <div onClick={() => {
                        dispatch(setCurrentTrack(track))
                    }} className="result flex gap-4 p-2 bg-bg-primary-default rounded-md mt-4">
                        <img className='aspect-square h-20 rounded-md' src={track.poster} alt="" />
                        <div className="text w-full truncate pr-4">
                            <h1 className="truncate title text-xl">{track.title}</h1>
                            <p className="truncate artist opacity-55">{track.artists.map(artist => artist.name).join(' , ')}</p>
                        </div>
                    </div>
                ))}

            </div>

        </section>

    )
}

export default Search