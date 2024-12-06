"use client"

import React, { useRef, useState } from 'react';
import axios from '../../../../extends/axios';
import { useRouter } from 'next/navigation';
import * as RemixIcon from "@remixicon/react"
import artists from '@/components/artists';

const Library = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (fileInputRef.current?.files) {
            const audioFiles = Array.from(fileInputRef.current.files).filter(file => file.type.startsWith('audio/'));
            if (audioFiles.length > 0) {
                const formData = new FormData();
                audioFiles.forEach(file => formData.append('file', file));
                axios.post('/upload', formData)
                    .then(response => {

                        router.push('/home');
                    })
                    .catch(error => {
                        // Handle error
                        console.error(error);
                    });

            }
        }
    };

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setSelectedFiles(files);
        }
    };

    return (
        <section className='p-6 py-6'>
            <form onSubmit={handleSubmit} className='flex justify-between'>
                <label htmlFor="audioFiles" className='p-3 rounded-md flex gap-4 items-center text-lg border border-slate-400'>
                    <input id='audioFiles' hidden type="file" accept="audio/*" ref={fileInputRef} multiple onChange={handleFileChange} />
                    <h1>Upload audio files here  </h1>
                    <RemixIcon.RiUpload2Line size={18} />
                </label>
                <button className='p-3 rounded-md flex gap-3 items-center text-lg border border-bg-highlight px-10' type="submit">Submit</button>
            </form>
            {selectedFiles.length > 0 && (
                <div>
                    <h3 className='mt-5' >Selected Files: {selectedFiles.length} Files </h3>
                    <ul className='list-disc' >
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );


};





export default Library;