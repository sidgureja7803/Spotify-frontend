"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import * as RemixIcon from "@remixicon/react"
import { useAppDispatch, useAppSelector } from '../redux/hook';
import axios from '../../extends/axios';
import { setCurrentTrack } from '../redux/reducers/music';

const Player = () => {


    const dispatch = useAppDispatch();
    const tracks = useAppSelector(state => state.music.value.tracks);
    const currentTrack = useAppSelector(state => state.music.value.currentTrack);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isLiked, setIsLiked] = useState<boolean>(currentTrack ? currentTrack.isLiked : false)
    const audio = useRef<HTMLAudioElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const handlePlayPause = () => {
        if (isPlaying) audio.current?.pause();
        else audio.current?.play();
        setIsPlaying(!isPlaying);
    };

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        const progressBar = document.querySelector('.progressBar') as HTMLElement;
        const thumb = document.querySelector('.thumb') as HTMLElement;
        const progress = (value / 100) * progressBar.offsetWidth;
        thumb.style.left = `${progress}px`;
        const audioElement = document.querySelector('audio') as HTMLAudioElement;
        audioElement.currentTime = (value / 100) * audioElement.duration;
    };
    const [trackProgress, setTrackProgress] = useState<number>(0);

    const handleLike = () => {
        setIsLiked(!isLiked);
        axios.post('/like', { trackId: currentTrack?._id });
    };

    const handleNext = () => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex(track => track._id === currentTrack._id);
        const nextIndex = (currentIndex + 1) % tracks.length;
        dispatch(setCurrentTrack(tracks[nextIndex]));
    };

    const handlePrevious = () => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex(track => track._id === currentTrack._id);
        const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        dispatch(setCurrentTrack(tracks[previousIndex]));
    };

    useEffect(() => {
        if (!currentTrack) return;

        navigator.mediaSession.setActionHandler('nexttrack', handleNext);
        navigator.mediaSession.setActionHandler('previoustrack', handlePrevious);
        navigator.mediaSession.setActionHandler('play', handlePlayPause);
        navigator.mediaSession.setActionHandler('pause', handlePlayPause);

        if (currentTrack)
            setIsLiked(currentTrack.isLiked);


        const audioElement = audio.current as HTMLAudioElement;
        const progressBar = progressBarRef.current as HTMLElement;
        const thumb = thumbRef.current as HTMLElement;

        let lastTime = 0;
        let maxFPS = 60; // Change this value to set the maximum FPS
        function updateProgress(timestamp: number) {
            if (!lastTime) {
                lastTime = timestamp;
            }
            const elapsed: number = timestamp - lastTime;
            if (elapsed > (1000 / maxFPS)) {
                lastTime = timestamp;
                // Your code here

                audioElement.paused ? setIsPlaying(false) : setIsPlaying(true);

                const progress: number = audioElement.duration ? (audioElement.currentTime / audioElement.duration) * 100 : 0;
                progressBar.style.width = `${progress}%`;
                thumb.style.left = `${progress}%`;
                setTrackProgress(progress);

            }
            requestAnimationFrame(updateProgress);
        }
        requestAnimationFrame(updateProgress);


        if (currentTrack) {
            progressBar.style.width = '0%';
            thumb.style.left = '0%';
        }

        progressBar.style.width = `${trackProgress}%`;
        thumb.style.left = `${trackProgress}%`;

        audioElement.addEventListener('ended', handleNext);

    }, [currentTrack]);

    const playPauseButton = isPlaying ? (
        <div className="pause" onClick={handlePlayPause}>
            <RemixIcon.RiPauseFill className="icon text-xl" size={40} />
        </div>
    ) : (
        <div className="play" onClick={handlePlayPause}>
            <RemixIcon.RiPlayFill className="icon text-xl" size={40} />
        </div>
    );


    if (!currentTrack) return (<>    </>)

    return (
        <div className="top flex justify-center w-full p-3 pb-0">
            <audio ref={audio} src={currentTrack.url} playsInline autoPlay className='none'></audio>
            <div className="player flex flex-col gap-1 max-w-xl w-full p-3 pb-0 bg-bg-primary-default rounded-lg">
                <div className="details flex justify-between">
                    <div className="left flex gap-3">
                        <div className="poster h-12 w-12">
                            <img
                                className="h-full w-full rounded-sm object-cover"
                                src={currentTrack.poster}
                                alt=""
                            />
                        </div>
                        <div className="text">
                            <h1 className="truncate max-w-44" >{currentTrack.title}</h1>
                            <p className="opacity-60 truncate max-w-44" >{currentTrack.artists.map(artist => artist.name).join('/')}</p>
                        </div>
                    </div>
                    <div className="controls h-full flex items-center gap-3">



                        <div className="like" onClick={handleLike}>
                            {isLiked ? <RemixIcon.RiHeartFill className="icon" size={30} /> : <RemixIcon.RiHeartLine className="icon" size={30} />}
                        </div>
                        <div className="previous" onClick={handlePrevious}>
                            <RemixIcon.RiSkipBackFill className="icon text-xl" size={30} />
                        </div>
                        {playPauseButton}
                        <div className="next" onClick={handleNext}>
                            <RemixIcon.RiSkipForwardFill className="icon text-xl" size={30} />
                        </div>
                    </div>
                </div>
                <div className="progress w-full  relative">
                    <input
                        className="w-full opacity-0"
                        type="range"
                        min={0}
                        max={100}
                        value={0}
                        onChange={handleRangeChange}
                    />
                    <div className="dummy flex justify-start items-center pointer-events-none absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div ref={progressBarRef} className="progressBar w-full h-1 bg-gray-300 rounded-sm relative z-10"></div>
                        <div ref={thumbRef} className="thumb h-4 w-4 rounded-full bg-gray-300 absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="progressBarRunWay w-full h-1 bg-gray-700 rounded-sm absolute"></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Player