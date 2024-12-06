import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store'
import axios from '../../../extends/axios';


// Define a type for the slice state
export interface Track {
    isLiked: boolean | (() => boolean);
    _id: string;
    title: string;
    artists: Array<any>;
    album: string;
    year: number;
    tags: Array<any>;
    explicit: boolean;
    poster: string;
    url: string;
    plays: number;
    likes: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Artist {
    _id: string;
    name: string;
    bio?: string;
    imageUrl?: string;
    genres?: string[];
    imageReference: File | string;
}

export interface MusicState {
    value: {
        tracks: Track[];
        currentTrack: Track | null;
        lastTracks: Track[];
        artists: Artist[];
    }
}

const initialState: MusicState = {
    value: {
        tracks: [],
        currentTrack: null,
        lastTracks: [],
        artists: []

    }
};

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setTracks: (state, action) => {
            state.value.tracks = action.payload;
        },
        setCurrentTrack: (state, action) => {
            axios.put('/history', { trackId: action.payload._id });
            navigator.mediaSession.metadata = new MediaMetadata({
                title: action.payload.title,
                artist: action.payload.artists.map((artist: any) => artist.name).join(', '),
                album: action.payload.album,
                artwork: [
                    { src: action.payload.poster, sizes: '96x96', type: 'image/png' },
                    { src: action.payload.poster, sizes: '128x128', type: 'image/png' },
                    { src: action.payload.poster, sizes: '192x192', type: 'image/png' },
                    { src: action.payload.poster, sizes: '256x256', type: 'image/png' },
                    { src: action.payload.poster, sizes: '384x384', type: 'image/png' },
                    { src: action.payload.poster, sizes: '512x512', type: 'image/png' },
                ],
            });
            state.value.currentTrack = action.payload;
        },
        setLastTracks: (state, action) => {
            state.value.lastTracks = action.payload;
        },
        setArtists: (state, action) => {
            state.value.artists = action.payload;
        }

    },
});

export const { setTracks, setCurrentTrack, setLastTracks, setArtists } = musicSlice.actions;
export const music = (state: RootState) => state.music.value
export default musicSlice.reducer;
