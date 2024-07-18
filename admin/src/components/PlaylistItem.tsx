import { Playlist } from '@/interface/playlist'
import Image from 'next/image'
import React from 'react'

function PlaylistItem({ playlist }: { playlist: Playlist }) {
    return (
        <div className='cursor-pointer '>
            <div className='overflow-hidden'>
                <Image
                    src={playlist.thumbnail}
                    width={250}
                    height={250}
                    alt='playlist'
                    unoptimized
                    className='hover:scale-110 ease-linear duration-200'
                />
            </div>
            <p>{playlist.name}</p>
        </div>
    )
}

export default PlaylistItem