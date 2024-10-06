'use client'
import React, { ReactNode } from 'react';
import Landscape from '../../app/assets/landscapebg.jpg';
import Image from 'next/image';
import Logo from '../../app/assets/datalogo.png';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

interface GetStartedProps {
    button: ReactNode;
}

export default function GetStarted({ button }: GetStartedProps) {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <main className="flex-grow flex flex-col items-center justify-center p-4 absolute inset-0 z-10">
                <div className='flex flex-col items-center justify-center px-20 py-8 '>
                    <h1 className="text-6xl font-bold font-vibe text-white">Welcome to</h1>
                    <Image src={Logo} alt="DataFarm Logo" className='w-80' />
                    <p className="text-2xl text-white italic">Powered by AI</p>
                    {button}
                </div>
            </main>
        </div>
    );
};