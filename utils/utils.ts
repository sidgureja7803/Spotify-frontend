import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../extends/axios';

interface AuthenticatedWrapperProps {
    children: ReactNode;
}

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return false;
        const response = await axios.post<{ isAuthenticated: boolean }>('/auth/isAuthenticate');
        const data = response.data;
        return data.isAuthenticated;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};


export function throttle(callback: Function, delay: number) {
    let last: number = 0;
    return function (...args: any) {
        const now = new Date().getTime();
        if (now - last < delay) return;
        last = now;
        callback(...args);
    }
}

