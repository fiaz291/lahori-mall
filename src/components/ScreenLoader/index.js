import React from 'react';
import Loader from '../Loader';

export default function ScreenLoader() {
    return(
        <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-blend-screen fixed backdrop-blur-[2px] min-w-screen bg-white/20 z-10'>
            <Loader width={220} height={150} />
        </div>
    )
}