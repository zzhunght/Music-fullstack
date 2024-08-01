import { Playlist } from '@/interface/playlist'
import React from 'react'

function PlaylistItem({ playlist }: { playlist: Playlist }) {
    return (
        <div className='cursor-pointer '>
            <div className='overflow-hidden'>
                <img
                    src={playlist.thumbnail}
                    alt='playlist'
                    className='hover:scale-110 ease-linear duration-200 rounded-lg object-cover w-[250px] h-[250px]'
                />
            </div>
            <p>{playlist.name}</p>
        </div>
    )
}

export default PlaylistItem